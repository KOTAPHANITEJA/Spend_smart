import express from "express";
import { createOrUpdateUser, getUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createOrUpdateUser);
router.get("/:email", getUser);
router.put("/:email", updateUser);  // Add this line

export default router;