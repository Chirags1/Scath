const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
const path = require("path");
const flash = require("connect-flash");
const expressSession = require("express-session");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const indexRouter = require("./routes/indexRouter");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/user", userRouter);

app.listen(3000);
