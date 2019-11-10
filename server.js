//1- b3ml require 3la kol el packages ely hst5dmha fl server bta3 el node.

var express = require("express");
var app = express();
var session = require("express-session");
var uuid = require("uuid/v4");
var cookieParser = require("cookie-parser");
var cors = require("cors");

// hageb el connection bta3 el database
var createDbConnection = require("./DBConnection");

// require for all api's

var CreateUserAPIS = require("./apis/user");
var CreateCategoryAPIS = require("./apis/category");
var CreateProductAPIS = require("./apis/product");
var CreateReviewAPIS = require("./apis/review");
var CreatePaymentAPIS = require("./apis/payment");

function authenticate(req, resp, next) {
  if (req.url === "/signup" || req.url === "/signin") {
    next();
  } else {
    if (req.session.user && req.cookies["connect.sid"]) {
      next();
    } else {
      resp.json({ message: "error" });
    }
  }
}

// 2- h-run el packages fl middleware layer mn 5lal el app.use() function

app.use(express.json()); // 3shan el body bta3 el requests ykon mafhom blnsba lel node server
app.use(session({ genid: uuid, secret: "mysecret...." })); // hsh9al el session authentication fl middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // el server bta3 el frontend angular app 3shan a3ml allow lel requests mno
    credentials: true // da m3nah en el login response hya5od el token lel frontend
  })
);
app.use(authenticate);

// bnady 3la el function ely bft7 gwaha el connection bta3 el database.
createDbConnection();

CreateUserAPIS(app);
CreateCategoryAPIS(app);
CreateProductAPIS(app);
CreateReviewAPIS(app);
CreatePaymentAPIS(app);

// default api law m3ndesh ay url

app.get("/", (req, resp) => {
  resp.send("server is runnign.....");
});

app.listen(process.env.PORT || 4000, function(){
  console.log('Your node js server is running');
});