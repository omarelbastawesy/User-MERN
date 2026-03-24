import {
  deleteUser,
  getAllUsers,
  getUserById,
  newUser,
  updateUser,
} from "../services/user.service.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      message: "You are get your users successfully.",
      data: users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    res.status(200).json({
      success: true,
      message: "You are get your user successfully.",
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const newUserController = async (req, res) => {
  try {
    const user = await newUser(req.body);

    res.status(201).json({
      success: true,
      message: "The user is added successfully",
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = await updateUser(userId, userData);

    res.status(200).json({
      success: true,
      message: "The user is updated successfully.",
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "The user is deleted successfully.",
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
