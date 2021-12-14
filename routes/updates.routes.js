const router = require("express").Router();

const Updates = require("../models/Updates.model");

// View routes:

// updates/post list (read)
router.get("/updates", (req, res, next) => {
  Updates.find()
    .populate("updatingUser")
    .populate("updatedDream")
    .populate("comments")
    .then((updates) => {
      res.status(200).json(updates);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// one Post/Update  (read)
router.get("/update/:updateId", (req, res, next) => {
  Updates.findById(req.params.dreamId)
    .populate("updatingUser")
    .populate("updatedDream")
    .populate("comments")
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

// Posts/Update Create (create)
router.post("/updates/new", (req, res, next) => {
  const {
    name,
    message,
    description,
    image,
    ImgPost,
    date,
    updatingUser,
    updatedDream,
    comments,
    likes,
  } = req.body;
  console.log(req.body);
  Updates.create({
    name,
    message,
    description,
    image,
    ImgPost,
    date,
    updatingUser,
    updatedDream,
    comments,
    likes,
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

// Post/Update Edit
router.patch("/updates/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    message,
    image,
    ImgPost,
    date,
    updatingUser,
    updatedDream,
    comments,
    likes,
  } = req.body;
  Updates.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        message,
        image,
        ImgPost,
        date,
        updatingUser,
        updatedDream,
        comments,
        likes,
      },
    },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong, Post edit unsuccessful",
        message: err,
      });
    });
});

// Post/Update delete
router.delete("/updates/delete/:id", (req, res, next) => {
  const id = req.params.id;
  Updates.findByIdAndDelete(id)
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

module.exports = router;
