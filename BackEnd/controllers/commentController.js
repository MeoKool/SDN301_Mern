const Watch = require("../models/Watches");

const commentController = {
  //createComment
  createComment: async (req, res) => {
    try {
      const watch = await Watch.findById(req.params.watchId);
      const existingComment = watch.comments.find(
        (comment) => comment.author.toString() === req.body.author
      );
      if (existingComment) {
        return res
          .status(400)
          .send("Each author can only create one comment per watch.");
      }
      const comment = {
        rating: req.body.rating,
        content: req.body.content,
        author: req.body.author,
      };
      watch.comments.push(comment);
      await watch.save();
      res.status(200).send(watch);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  //getAllComments
  getAllComments: async (req, res) => {
    const watch = await Watch.findById(req.params.watchId).populate(
      "comments.author"
    );
    res.status(200).send(watch.comments);
  },
  //getByIDComments
  getByIDComments: async (req, res) => {
    const watch = await Watch.findById(req.params.watchId);
    const comment = watch.comments.id(req.params.commentId);
    res.status(200).send(comment);
  },
  //updateComment
  updateComment: async (req, res) => {
    const watch = await Watch.findById(req.params.watchId);
    const comment = watch.comments.id(req.params.commentId);
    comment.set(req.body);
    await watch.save();
    res.status(200).send(comment);
  },
  //deleteComment
  deleteComment: async (req, res) => {
    const watch = await Watch.findById(req.params.watchId);
    const commentId = req.params.commentId;
    const comment = watch.comments.id(commentId);
    if (!comment) {
      res.status(404).send({ message: "Comment not found" });
      return;
    }
    watch.comments.remove(commentId);
    await watch.save();
    res.status(200).send({ message: "Comment deleted" });
  },
};

module.exports = commentController;
