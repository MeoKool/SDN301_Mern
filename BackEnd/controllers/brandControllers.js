const Brand = require("../models/Brands");
const Watch = require("../models/Watches");
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
      const brands = await Brand.find();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //getByIDBrands
  getByIDBrands: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //deleteBrand
  deleteBrand: async (req, res) => {
    try {
      const watches = await Watch.find({ brand: req.params.id });
      if (watches.length > 0) {
        res.status(404).json({
          message: "Không thể xóa vì có sản phẩm trong thương hiệu này",
        });
      } else {
        await Brand.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Brand deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = brandController;
