require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", usersRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Corriendo en el puerto:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
