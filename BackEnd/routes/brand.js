const brandControllers = require("../controllers/brandControllers");
const middleWareControllers = require("../controllers/middleWareControllers");
const middleWareValidation = require("../controllers/middleWareValidation");
const router = require("express").Router();

router.post(
  "/createBrand",
  middleWareControllers.verifyAdmin,
  middleWareValidation.validateCreateBrand,
  brandControllers.createBrand
);
router.get("/getAllBrands", brandControllers.getAllBrands);
router.get(
  "/getByIDBrands/:id",
  middleWareControllers.verifyToken,
  brandControllers.getByIDBrands
);
router.delete(
  "/deleteBrand/:id",
  middleWareControllers.verifyAdmin,
  brandControllers.deleteBrand
);
module.exports = router;
