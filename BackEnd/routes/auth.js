const authControllers = require("../Controllers/authControllers");
const middleWareControllers = require("../controllers/middleWareControllers");
const middleValidation = require("../controllers/middleWareValidation");

const router = require("express").Router();

router.post(
  "/createUser",
  middleValidation.validateCreateMember,
  authControllers.createUser
);
router.post(
  "/Login",
  middleValidation.validateLogin,
  authControllers.loginMember
);
router.post(
  "/changePassword",
  middleValidation.validateChangePassword,
  middleWareControllers.verifyToken,
  authControllers.changePassword
);
router.put(
  "/updateMember/:memberName",
  middleWareControllers.verifyToken,
  middleValidation.validateUpdateMember,
  authControllers.updateMember
);
router.get(
  "/getByMemberName/:memberName",
  middleWareControllers.verifyToken,
  middleValidation.validateGetByMemberName,
  authControllers.getByMemberName
);
router.get(
  "/getAllMembers",
  middleWareControllers.verifyAdmin,
  authControllers.getAllMembers
);
router.post("/Logout", authControllers.logoutMember);

router.post("/refresh", authControllers.refreshToken);

router.delete(
  "/deleteMember/:memberName",
  middleWareControllers.verifyAdmin,
  authControllers.deleteMember
);
module.exports = router;
