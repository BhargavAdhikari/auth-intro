import mongoose from "mongoose";

const dbName = "authentication";
const dbUsername = "Bhargavadhikari71";
const dbPassword = "bhargav123";

let connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.5a9aw82.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Database Connection is established ");
  } catch (error) {
    console.log(error.message);
    console.log("The DB connection has failed");
  }
};

export default connectDB;
