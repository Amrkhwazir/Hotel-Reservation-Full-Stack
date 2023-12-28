import mongoose from "mongoose";
import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/roomControllers.js";
import { verifyAdmin } from "../utilis/verifyToken.js";

const roomRouter = express.Router();

// create rooms
roomRouter.post("/:hotelid", verifyAdmin,  createRoom);
// update rooms
roomRouter.put("/:id", verifyAdmin,  updateRoom);
// delete rooms
roomRouter.delete("/:id/:hotelid", verifyAdmin,  deleteRoom);
// get rooms
roomRouter.get("/:id",  getRoom);
// get all rooms
roomRouter.get("/",  getAllRoom);


export default roomRouter