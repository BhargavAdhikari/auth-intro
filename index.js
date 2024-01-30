import express from "express";
import connectDB from "./connect.db.js";
import userRouter from "./user/user.route.js";
import courseRouter from "./course/course.route.js";

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(courseRouter);

const PORT = 4500;

connectDB();

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
