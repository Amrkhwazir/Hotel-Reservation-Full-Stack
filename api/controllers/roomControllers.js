import express from "express";
import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { errorCreate } from "../utilis/error.js";


// create a new room
export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {room : savedRoom._id},
            });
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err)
    }
} 

// update new room
export const updateRoom = async (req,res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,
        {$set: req.body},
        {new: true})
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err)
    }
}

// delete new room
export const deleteRoom = async (req,res, next) => {

    const hotelId = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {room : req.params.id},
            });
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err)
    }
}

// get a new room
export const getRoom = async (req,res, next) => {
    try {
       const room =  await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err)
    }
}

// get all new room
export const getAllRoom = async (req,res, next) => {
    try {
       const rooms =  await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err)
    }
}
