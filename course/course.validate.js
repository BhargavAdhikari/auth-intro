import Yup from "yup";

const addCourseSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .trim()
    .max(55, "Name must be at max 55 characters."),
  price: Yup.number()
    .min(0, "pricemust be at least 0.")
    .max(30000, "Rating must be at max 10.")
    .required(),

  duration: Yup.number().min(30).max(90).required(),
});

export { addCourseSchema };
