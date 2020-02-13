const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const pino = require("express-pino-logger")();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());

console.log(`Your port is ${process.env.PORT || 5000}`);

app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);

//Routes
const users = require("./routes/api/users");
app.use("/api/users", users);
const utility = require("./routes/api/utility");
app.use("/api/utility", utility);
// const shift = require("./routes/api/shift");
// app.use("/api/shift", shift);

// const quiz = require("./routes/api/quiz");
// app.use("/api/quiz", quiz);


// const purchase = require("./routes/api/inventory/order/purchase");
// app.use("/api/purchase", purchase);

// const product = require("./routes/api/inventory/product");
// app.use("/api/inventory/product", product);
// const salesOrder = require("./routes/api/inventory/order/sales");
// app.use("/api/salesorders", salesOrder);
// const notification = require("./routes/api/notification/notification'");
// app.use("/api/notification", notification);

// const modules = require("./routes/api/modules");
// app.use("/api/modules", modules);

// const order=require("./routes/api/order");
// app.use("/api/order",order);

const category=require("./routes/api/category");
app.use("/api/category",category);

// const menu=require("./routes/api/Menu");
// app.use("/api/Menu",menu);

module.exports = app;
