var mongoose = require("mongoose");
var ReviewModel = require("../models/review");

function CreateReviewAPIS(app) {
  // insert review api
  app.post("/insertreview", async (req, resp) => {
    try {
      const { content, user, product, rate } = req.body;

      let review = new ReviewModel({
        _id: mongoose.Types.ObjectId(),
        content,
        user,
        product,
        rate
      });
      await review.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // editreview api

  app.post("/editreview", async (req, resp) => {
    try {
      const { id, content, rate } = req.body;
      await ReviewModel.findOneAndUpdate(
        { _id: id },
        {
          content,
          rate
        }
      );
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/removereview", async (req, resp) => {
    try {
      const { id } = req.body;
      await ReviewModel.remove({ _id: id });
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/getallreviews", async (req, resp) => {
    try {
      const { product } = req.body;
      let reviews = await ReviewModel.find({ product });
      resp.json({ message: "success", reviews });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });
}

module.exports = CreateReviewAPIS;
