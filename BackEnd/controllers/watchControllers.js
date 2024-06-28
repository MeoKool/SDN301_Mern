const Brands = require("../models/Brands");
const Watches = require("../models/Watches");
const mongoose = require("mongoose");
const watchesControllers = {
  //getAllWatches
  getAllWatches: async (req, res) => {
    try {
      const users = await Watches.find().populate("brand");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // getWatchByName
  getWatchByName: async (req, res) => {
    try {
      const watch = await Watches.findOne({
        watchName: req.params.name,
      }).populate("brand");
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json(watch);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // createWatch
  createWatch: async (req, res) => {
    const imagePath = req.file ? req.file.path : "";
    const watch = new Watches({
      watchName: req.body.watchName,
      image: imagePath,
      price: req.body.price,
      Automatic: req.body.Automatic,
      watchDescription: req.body.watchDescription,
      brand: req.body.brand,
    });

    if (req.body.brand) {
      if (!mongoose.Types.ObjectId.isValid(req.body.brand)) {
        return res.status(400).json({ message: "Invalid brandId" });
      }
      const brand = await Brands.findById(req.body.brand);
      if (!brand) {
        return res.status(500).json({ message: "Brand not found" });
      }
      await brand.updateOne({ $push: { watches: watch._id } });
    }

    try {
      const newWatch = await watch.save();
      res.status(200).json(newWatch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //getByIDWatches
  getByIdWatches: async (req, res) => {
    try {
      const watch = await Watches.findById(req.params.id).populate([
        "brand",
        { path: "comments.author" },
      ]);

      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json(watch);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //SearchWatches
  searchWatches: async (req, res) => {
    try {
      let watches;
      if (req.params.name) {
        watches = await Watches.find({
          watchName: { $regex: req.params.name, $options: "i" },
        }).populate("brand");
      } else {
        watches = await Watches.find().populate("brand");
      }
      if (watches.length === 0) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json(watches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //updateWatch
  updateWatch: async (req, res) => {
    const imagePath = req.file ? req.file.path : "";
    const watch = {
      watchName: req.body.watchName,
      image: imagePath,
      price: req.body.price,
      Automatic: req.body.Automatic,
      watchDescription: req.body.watchDescription,
      brand: req.body.brand,
    };
    try {
      const updatedWatch = await Watches.findByIdAndUpdate(
        req.params.id,
        watch,
        { new: true }
      );
      if (!updatedWatch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json(updatedWatch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //deleteWatch
  deleteWatch: async (req, res) => {
    try {
      const watch = await Watches.findById(req.params.id);
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      if (watch.comments && watch.comments.length > 0) {
        return res
          .status(400)
          .json({ message: "Cannot delete watch with comments" });
      }
      await Watches.findByIdAndDelete(req.params.id);
      await Brands.findByIdAndUpdate(watch.brand, {
        $pull: { watches: watch._id },
      });
      res.status(200).json({ message: "Watch deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //getWatchByBrand
  getWatchByBrand: async (req, res) => {
    try {
      const watches = await Watches.find({ brand: req.params.id }).populate(
        "brand"
      );

      if (watches.length === 0) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json(watches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = watchesControllers;
