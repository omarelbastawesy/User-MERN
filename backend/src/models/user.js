import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    jobTitle: { type: String, require: true },
    salary: { type: String, require: true },
    image: { type: String },
  },
  { timestamps: true }, // mongoose will add filed createdAt, updatedAt by defoult
);

const User = mongoose.model("User", userSchema);

export default User;
