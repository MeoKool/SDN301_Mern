const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const commentController = require("../controllers/commentController");
const middleWareControllers = require("../controllers/middleWareControllers");
const middleWareValidation = require("../controllers/middleWareValidation");

router.post(
  "/:watchId/comments",
  middleWareControllers.verifyMember,
  middleWareValidation.validateComment,
  commentController.createComment
);
router.get("/:watchId/comments", commentController.getAllComments);
router.get("/:watchId/comments/:commentId", commentController.getByIDComments);
router.put(
  "/:watchId/comments/:commentId",
  middleWareControllers.verifyMember,
  middleWareValidation.validateComment,
  commentController.updateComment
);
router.delete(
  "/:watchId/comments/:commentId",
  middleWareControllers.verifyMember,
  commentController.deleteComment
);

module.exports = router;
