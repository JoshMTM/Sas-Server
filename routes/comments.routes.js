const router = require("express").Router();

const Comments = require("../models/Comments.model");

// View routes:

// dreams list (read)
router.get("/comments", (req, res, next) => {
  Comments.find()
    .populate("commentedDream")
    .populate("commentingUser")
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// one Dream  (read)
router.get("/comments/:dreamId", (req, res, next) => {
  Comments.findById(req.params.dreamId)
    .populate(commentedDream)
    .populate(commentingUser)
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

// Comments Create (create)
router.post("/comments/new", (req, res, next) => {
  const { text, commentingUser, commentedDream, date } = req.body;
  console.log(req.body);
  Comments.create({
    text,
    commentingUser,
    commentedDream,
    date,
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

// Comments Update
router.patch("/comments/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const { text, commentingUser, commentedDream, date } = req.body;
  Comments.findByIdAndUpdate(
    id,
    { $set: { text, commentingUser, commentedDream, date } },
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

// Comment delete
router.delete("/comments/delete/:id", (req, res, next) => {
  const id = req.params.id;
  Comments.findByIdAndDelete(id)
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
