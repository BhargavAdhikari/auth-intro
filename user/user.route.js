import express from "express";
// import mongoose from "mongoose";
import { addUserSchema, loginUserSchema } from "./user.validation.js";
import { User } from "./user.model.js";
import * as bcrypt from "bcrypt";
import { validateReqBody } from "../middleware/validation.middleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// register

router.post(
  "/user/add",
  async (req, res, next) => {
    let newUser = req.body;
    //   console.log(newUser);

    let validatedUserData;
    try {
      validatedUserData = await addUserSchema.validate(newUser);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }

    req.body = validatedUserData;
    next();
  },

  async (req, res) => {
    // check if user already exists with this email

    let newUser = req.body;

    let alreadyAUser = await User.findOne({ email: newUser.email });

    if (alreadyAUser) {
      return res
        .status(400)
        .send({ message: "The user already exists in the database" });
    }

    let hashedPassword = await bcrypt.hash(newUser.password, 10);

    newUser.password = hashedPassword;

    await User.create(newUser);

    return res.status(201).send({ message: "New User added successfully " });
  }
);

// login
router.post(
  "/user/login",

  validateReqBody(loginUserSchema),
  async (req, res) => {
    let loginCredentials = req.body;

    // check if user with this email exists

    let user = await User.findOne({ email: loginCredentials.email });

    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    const isValidPassword = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid Credentials " });
    }

    const token = jwt.sign({ email: user.email }, "jwtsecretkey");

    user.password = undefined;

    return res
      .status(201)
      .send({ message: "Login Successfull ", token: token, user: user });
  }
);

export default router;
