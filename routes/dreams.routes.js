const path = require("path");
const router = require("express").Router();

const Dreams = require("../models/Dreams.model");

// View routes:

// dreams list (read)
router.get("/dreams", (req, res, next) => {
  Dreams.find()
    .populate("items")
    .populate("dreamer")
    .then((dreams) => {
      res.status(200).json(dreams);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// one Dream  (read)
router.get("/dreams/:dreamId", (req, res, next) => {
  Dreams.findById(req.params.dreamId)
    .populate(items)
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

// Dreams Create (create)
router.post("/dreams/new", (req, res, next) => {
  const { title, description, image, items, dreamer } = req.body;
  console.log(req.body);
  Dreams.create({
    title,
    description,
    image,
    dreamer,
    items,
  })
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

// Dream Update
router.patch("/dreams/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, description, image, items, dreamer } = req.body;
  Dream.findByIdAndUpdate(
    id,
    { $set: { title, description, image, items, dreamer } },
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

// Dream delete
router.delete("/dreams/delete/:id", (req, res, next) => {
  const id = req.params.id;
  Dreams.findByIdAndDelete(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Could not delete the dream",
        message: err,
      });
    });
});

//Search by category
router.get("/dreamsearch", (req, res, next) => {
  const { category } = req.query;
  Dreams.find({ category })
    .populate("dreamer")
    .then((dreams) => {
      res.status(200).json(dreams);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

module.exports = router;
