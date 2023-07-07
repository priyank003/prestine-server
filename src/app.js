const express = require("express");
const app = express();
// const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");
// const passport = require("passport");

const corsOptions = {
  origin: ["http://localhost:3000/", "http://127.0.0.1:5500"],
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "/views"));

// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "script-src 'self' https://cdn.tailwindcss.com/ 'unsafe-inline'"
//   );
//   next();
// });

//security related middlewares
// app.use(helmet());
// app.use(passport.initialize());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

app.use(morgan("dev"));

const {
  getAllProductsAndPlans,
  createCustomerAndSubscription,
} = require("./services/stripe");
const contactRouter = require("./routes/contact");
const { PLANS_DATA } = require("../data/plans");

app.get("/", function (req, res) {
  res.render("index.ejs", { title: "Mini Craft" });
});
app.get("/home", function (req, res) {
  res.redirect("/");
});

app.get("/pricing", (req, res) => {
  res.render("frame3.ejs");
});
app.get("/support", (req, res) => {
  res.render("frame4.ejs");
});

app.get("/more-info", (req, res) => {
  res.render("frame2.ejs");
});

app.get("/checkout", (req, res) => {
  res.render("checkout.ejs");
});

app.use("/api/contact", contactRouter);

app.get("/api/plans", async (req, res) => {
  const data = await getAllProductsAndPlans();

  data.map((product) => {
    PLANS_DATA[Number(product.name)].planId = product.plans[0].id;
  });

  // const newData = data.filter((product) => {
  //   return product.plans.length > 0;
  // });
  const sortedPlans = [];
  for (key in PLANS_DATA) {
    sortedPlans.push(PLANS_DATA[key]);
  }
  sortedPlans.sort((a, b) => a.price - b.price);

  res.json(sortedPlans);

  // getAllProductsAndPlans().then(products => {
  //   products = products.filter(product => {
  //     return product.plans.length > 0;
  //   });
});

app.post("/api/processPayment", async (req, res) => {
  // const data = await getAllProductsAndPlans();
  // console.log(data);
  console.log("body", req.body);

  createCustomerAndSubscription(req.body)
    .then(() => {
      // res.render("page.html", {
      //   product: product,
      //   plan: plan,
      //   success: true,
      // });
      console.log("successs");
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      // res.render("signup.html", { product: product, plan: plan, error: true });
      res.status(400).json({ success: false, msg: err.message });
    });

  // res.json(data);
});

module.exports = app;
