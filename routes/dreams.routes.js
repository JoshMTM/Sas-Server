const path = require("path");
const router = require("express").Router();
const multer = require("multer");

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

// Services new form (read)
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

// Services read detail (read)
router.get("/services/:id", (req, res, next) => {
  const id = req.params.id;
  const user = req.session.myProperty;

  Service.findById(id)
    .populate("serviceProvider")
    .then((service) => {
      if (user) {
        const isServiceProvider = user._id == service.serviceProvider._id;
        const { firstName, lastName } = service.serviceProvider;
        res.render("services/detail", {
          service,
          isServiceProvider,
          firstName,
          lastName,
        });
      } else {
        res.render("user/signin-form.hbs", {
          error:
            "You need to log In or signup in order to view the details of every service and make a request",
        });
        return;
      }
    })
    .catch((err) => next(err));
});

// Services edit form (read)
router.get("/services/edit/:id", (req, res, next) => {
  const id = req.params.id;
  Service.findById(id)
    .then((service) => res.render("services/form", { service }))
    .catch((err) => next(err));
});

// Image download (read)
router.get("/services/images/:filename", (req, res, next) => {
  const filename = req.params.filename;
  const filepath = path.join(pathUploads, filename);
  res.sendFile(filepath, { headers: { "content-type": "image/png" } });
});

// Database routes:

// Service Create
router.post(
  "/services/new",
  uploader.single("serviceImage"),
  (req, res, next) => {
    const {
      name,
      description,
      category,
      address,
      time,
      price,
      serviceImage,
      requesters,
    } = req.body;
    Service.create({
      name,
      serviceProvider: req.session.myProperty._id,
      category,
      description,
      address,
      time,
      price,
      serviceImage: req.file.path,
      requesters,
    })
      .then(() => res.redirect("/services"))
      .catch((err) => next(err));
  }
);
// Service Update
router.post(
  "/api/services/:id",
  upload.single("serviceImage"),
  (req, res, next) => {
    const id = req.params.id;
    const service = req.body;
    Service.findByIdAndUpdate(id, service)
      .then(() => res.redirect("/services/" + id))
      .catch((err) => next(err));
  }
);

// Delete Service
router.get("/api/services/delete/:id", (req, res, next) => {
  const id = req.params.id;
  Service.findByIdAndDelete(id)
    .then(() => res.redirect("/services"))
    .catch((err) => next(err));
});

//Search by category
router.get("/servicesearch", (req, res, next) => {
  const { category } = req.query;
  Service.find({ category })
    .populate("serviceProvider")
    .then((services) => {
      res.render("services/list", { services });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
