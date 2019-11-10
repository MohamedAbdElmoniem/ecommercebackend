var mongoose = require("mongoose");
var ProductModel = require("../models/product");

function CreateProductAPIS(app) {
  // insert product api
  app.post("/insertproduct", async (req, resp) => {
    try {
      const {
        product_name,
        brand,
        model,
        price,
        discount,
        category
      } = req.body;

      let product = new ProductModel({
        _id: mongoose.Types.ObjectId(),
        product_name,
        brand,
        model,
        price,
        discount,
        category
      });
      await product.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // editproduct api

  app.post("/editproduct", async (req, resp) => {
    try {
      const { id, product_name, price, discount } = req.body;
      await ProductModel.findOneAndUpdate(
        { _id: id },
        {
          product_name,
          price,
          discount
        }
      );
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/removeproduct", async (req, resp) => {
    try {
      const { id } = req.body;
      await ProductModel.remove({ _id: id });
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/getallproducts", async (req, resp) => {
    try {
      const { category } = req.body;
      let products = await ProductModel.find({ category });
      resp.json({ message: "success", products });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });
}

module.exports = CreateProductAPIS;
