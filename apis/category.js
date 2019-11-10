var mongoose = require("mongoose");
var CategoryModel = require("../models/category");

function CreateCategoryAPIS(app) {
  // insert category api
  app.post("/insertcategory", async (req, resp) => {
    try {
      const { category_name } = req.body;

      let category = new CategoryModel({
        _id: mongoose.Types.ObjectId(),
        category_name
      });
      await category.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // editcategory api

  app.post("/editcategory", async (req, resp) => {
    try {
      const { id, category_name } = req.body;
      await CategoryModel.findOneAndUpdate(
        { _id: id },
        {
          category_name
        }
      );
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/removecategory", async (req, resp) => {
    try {
      const { id } = req.body;
      await CategoryModel.remove({ _id: id });
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.get("/getallcategories", async (req, resp) => {
    try {
      let categories = await CategoryModel.find({});
      resp.json({ message: "success", categories });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });
}

module.exports = CreateCategoryAPIS;
