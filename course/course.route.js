import express from "express";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { addCourseSchema } from "./course.validate.js";
import Course from "./course.model.js";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

const router = express.Router();

router.post(
  "/add/course",
  //   validate token
  async (req, res, next) => {
    // extract token from headers
    const authorization = req.headers.authorization;
    // console.log(authorization);
    const splittedValue = authorization?.split(" ");
    // console.log(splittedValue);
    const token = splittedValue[1];
    // console.log(token);
    let payload;
    try {
      payload = jwt.verify(token, "jwtsecretkey");
    } catch (error) {
      return res.status(409).send({ message: "Unauthorized " });
    }

    // console.log(payload);

    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    next();
  },

  validateReqBody(addCourseSchema),
  async (req, res) => {
    let newCourse = req.body;

    await Course.create(newCourse);

    return res.status(201).send({ message: "New Course added successfully " });
  }
);

export default router;
