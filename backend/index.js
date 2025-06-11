const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const port = 3000;
const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);
const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });
});
