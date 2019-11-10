var mongoose = require("mongoose");
var UserModel = require("../models/user");

function CreateUserAPIS(app) {
  // signup api --> insert user in database

  app.post("/signup", async (req, resp) => {
    try {
      const { username, password, phone, address, age, role } = req.body;

      let user = new UserModel({
        _id: mongoose.Types.ObjectId(),
        username,
        password,
        phone,
        address,
        age,
        role
      });

      await user.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // signin api
  // 1- at2kd en el user fl database
  // 2- law mwgod fl database aft7lo new session

  app.post("/signin", async (req, resp) => {
    try {
      const { username, password } = req.body;

      let user = await UserModel.findOne({ username, password });

      if (user) {
        req.session.user = user;
        resp.json({ message: "success", user });
      } else {
        resp.json({ message: "error" });
      }
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // signout api

  app.get("/signout", async (req, resp) => {
    await req.session.destroy();
    resp.json({ message: "success" });
  });

  // getuserdetails api

  app.get("/getuserdetails/:id", async (req, resp) => {
    try {
      const { id } = req.params;
      let user = await UserModel.findOne({ _id: id });
      resp.json({ message: "success", user });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // editprofile

  app.post("/editprofile", async (req, resp) => {
    try {
      const { id, username, password, age, phone, address } = req.body;

      await UserModel.findOneAndUpdate(
        { _id: id },
        {
          username,
          password,
          age,
          phone,
          address
        }
      );
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });
}

module.exports = CreateUserAPIS;
