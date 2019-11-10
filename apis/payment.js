var mongoose = require("mongoose");
var PaymentModel = require("../models/payment");

function CreatePaymentAPIS(app) {
  app.post("/insertpayment", async (req, resp) => {
    try {
      const { user, product, payment_method, paid, change } = req.body;

      let payment = new PaymentModel({
        _id: mongoose.Types.ObjectId(),
        user,
        product,
        payment_method,
        paid,
        change
      });
      await payment.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/editpayment", async (req, resp) => {
    try {
      const { id, payment_method, paid, change } = req.body;
      await PaymentModel.findOneAndUpdate(
        { _id: id },
        {
          payment_method,
          paid,
          change
        }
      );
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/removepayment", async (req, resp) => {
    try {
      const { id } = req.body;
      await PaymentModel.remove({ _id: id });
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/getallpaymentsforuser", async (req, resp) => {
    try {
      const { user } = req.body;
      let payments = await PaymentModel.find({ user });
      resp.json({ message: "success", payments });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });
}

module.exports = CreatePaymentAPIS;
