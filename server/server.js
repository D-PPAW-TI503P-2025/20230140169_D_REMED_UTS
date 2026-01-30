const express = require("express");
const app = express();

const { sequelize } = require("./models");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());

app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/borrow", require("./routes/borrowRoutes"));

sequelize.sync().then(() => {
  console.log("Database ready");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
