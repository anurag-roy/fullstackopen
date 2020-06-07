import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI;

console.log("Connecting to ", url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Connected succesfully"))
  .catch((err) => console.log("Couldn't connect. Error: ", err.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
