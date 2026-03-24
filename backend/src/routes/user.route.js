import express from "express";
import {
  getAllUsersController,
  getUserByIdController,
  newUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.post("/", newUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
