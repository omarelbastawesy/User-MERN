import User from "../models/user.js";

export const getAllUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 });
  return users;
};

export const getUserById = async (id) => {
  const users = await User.findById(id);

  if (!users) {
    const error = new Error("You are not have any users in your memory.");
    error.statusCode = 400;
    throw error;
  }

  return users;
};

export const newUser = async (userData) => {
  try {
    const { name, description, email, role, phone, address, jobTitle, salary, image } =
      userData;

    const isEmailExist = await User.find({ email });
    if (isEmailExist.length > 0) {
      const error = new Error("The Email is already exists.");
      error.statusCode = 400;
      throw error;
    }

    const isPhoneExist = await User.find({ phone });
    if (isPhoneExist.length > 0) {
      const error = new Error("The Phone number is already exists.");
      error.statusCode = 400;
      throw error;
    }

    const newUser = new User({
      name: name,
      description: description,
      email: email,
      role: role,
      phone: phone,
      address: address,
      jobTitle: jobTitle,
      salary: salary,
      image: image,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    throw error || "Internal server error.";
  }
};

export const updateUser = async (id, userData) => {
  try {
    const userId = id;
    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      const error = new Error("The user id is invalid.");
      error.statusCode = 400;
      throw error;
    }

    const email = userData.name;
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      const error = new Error("The user email is already exist.");
      error.statusCode = 400;
      throw error;
    }

    const phone = userData.phone;
    const isPhone = await User.findOne({ phone });
    if (isPhone) {
      const error = new Error("The user phone is already exist.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndUpdate(userId, userData, {
      returnDocument: "after",
    });

    return user;
  } catch (error) {
    throw error || "Internal server error.";
  }
};

export const deleteUser = async (userId) => {
  if (!userId) {
    const error = new Error("User id is required.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      const error = new Error("The user id is invalid.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndDelete(userId);

    return user;
  } catch (error) {
    throw error || "Internal server error.";
  }
};
