const middleWareControllers = require("../controllers/middleWareControllers");
const watchesControllers = require("../controllers/watchControllers");
const middleWareValidation = require("../controllers/middleWareValidation");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/getAllWatches", watchesControllers.getAllWatches);
router.get("/getWatchByName/:name", watchesControllers.getWatchByName);
router.post(
  "/createWatch",
  middleWareControllers.verifyAdmin,
  upload.single("image"),
  middleWareValidation.validateWatch,
  watchesControllers.createWatch
);
router.put(
  "/updateWatch/:id",
  middleWareControllers.verifyAdmin,
  upload.single("image"),
  middleWareValidation.validateWatch,
  watchesControllers.updateWatch
);
router.get("/getByIdWatches/:id/", watchesControllers.getByIdWatches);
router.get(
  "/searchWatches/:name",
  middleWareControllers.verifyToken,
  watchesControllers.searchWatches
);
router.delete(
  "/deleteWatch/:id",
  middleWareControllers.verifyAdmin,
  watchesControllers.deleteWatch
);
module.exports = router;
