import mongoose from "mongoose";
import express from "express";
import { adduser, deleteuser, getAllUser, getuser, updateuser } from "../controllers/userControls.js";
import {verifyUser, verifyAdmin} from "../utilis/verifyToken.js"

const userRouter = express.Router();


// add user
userRouter.post("/", verifyUser,  adduser);
// update user
userRouter.put("/:id", verifyUser, updateuser);
// delete user
userRouter.delete("/:id", verifyUser,  deleteuser);
// get user
userRouter.get("/:id", verifyUser,  getuser);
// get all users
userRouter.get("/", verifyAdmin,  getAllUser);

export default userRouter