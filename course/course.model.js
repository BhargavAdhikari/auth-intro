import mongoose from "mongoose";

// set rule

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
  },
  price: {
    type: Number,
    min: 0,
    max: 30000,
    required: false,
    default: null,
  },
  duration: {
    type: Number,
    min: 30,
    max: 90,
    required: true,
  },
});

// create table
const Course = mongoose.model("Course", courseSchema);

export default Course;
