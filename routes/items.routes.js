const router = require("express").Router();

const Dreams = require("../models/Dreams.model");
const Items = require("../models/Items.model");

// View routes:

// Items list (read)
router.get("/items", (req, res, next) => {
  Items.find()
    .populate("dream")
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// one Item  (read)
router.get("/items/:itemId", (req, res, next) => {
  Items.findById(req.params.itemId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Item Create (new)
router.post("/items/new", (req, res, next) => {
  const { name, category, description, qty, unit, dream } = req.body;
  console.log(req.body);
  Items.create({
    name,
    description,
    qty,
    unit,
    dream,
  })
    .then((response) => {
      console.log(response);
      Dreams.findByIdAndUpdate(dream, { $push: { items: response._id } }).then(
        (response) => {
          res.status(200).json(response);
        }
      );
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Item Update
router.patch("/items/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, description, qty, unit, dream } = req.body;
  Items.findByIdAndUpdate(
    id,
    { $set: { name, description, qty, unit, dream } },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong, Update unsuccessful",
        message: err,
      });
    });
});

// Item delete
router.delete("/items/delete/:id", (req, res, next) => {
  const id = req.params.id;
  Items.findByIdAndDelete(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Could not delete this item",
        message: err,
      });
    });
});

//Search by category
router.get("/itemsearch", (req, res, next) => {
  const { category } = req.query;
  Items.find({ category })
    .populate("dream")
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

module.exports = router;
