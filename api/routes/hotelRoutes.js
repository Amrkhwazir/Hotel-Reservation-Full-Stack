import mongoose from "mongoose";
import express from "express";
import { addHotel, countByCity, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotelControls.js";
import { verifyAdmin } from "../utilis/verifyToken.js";

const hotelRouter = express.Router();


// add hotels
hotelRouter.post("/", verifyAdmin,  addHotel);
// update hotels
hotelRouter.put("/:id", verifyAdmin,  updateHotel);
// delete hotels
hotelRouter.delete("/:id", verifyAdmin,  deleteHotel);
// get hotels
hotelRouter.get("/find/:id",  getHotel);
// get all hotels
hotelRouter.get("/",  getAllHotel);


hotelRouter.get("/CountByCity",  countByCity);
hotelRouter.get("/CountByType",  getAllHotel);

export default hotelRouter