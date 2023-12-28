import mongoose from "mongoose";
import express from "express";
import { register, signIn } from "../controllers/authControls.js";

const authRouter = express.Router();

authRouter.post("/signin", signIn);
authRouter.post("/register", register);

export default authRouter