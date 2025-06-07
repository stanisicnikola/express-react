const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });
});
