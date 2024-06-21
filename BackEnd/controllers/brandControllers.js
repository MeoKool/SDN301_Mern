const Brand = require("../models/Brands");

const brandController = {
  //createBrand
  createBrand: async (req, res) => {
    const brand = await new Brand({
      brandName: req.body.brandName,
    });
    try {
      const newBrand = await brand.save();
      res.status(200).json(newBrand);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //getAllBrands
  getAllBrands: async (req, res) => {
    try {
      const brands = await Brand.find().populate("watches");
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //getByIDBrands
  getByIDBrands: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id).populate({
        path: "watches",
        populate: {
          path: "brand",
        },
      });
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //deleteBrand
  deleteBrand: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      if (brand.watches.length === 0) {
        await Brand.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Brand deleted successfully" });
      } else {
        res.status(404).json({ message: "Cannot delete because have watches" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = brandController;
