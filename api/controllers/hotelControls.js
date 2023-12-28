import express, { json } from "express";
import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import { errorCreate } from "../utilis/error.js";


// create new hotel
export const addHotel = async (req,res, next) => {

    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err)
    }
};

// update new hotel
export const updateHotel = async (req,res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
        {$set: req.body},
        {new: true})
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err)
    }
}

// delete new hotel
export const deleteHotel = async (req,res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err)
    }
}

// get a new hotel
export const getHotel = async (req,res, next) => {
    try {
       const hotel =  await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err)
    }
}

// get all new hotel
export const getAllHotel = async (req,res, next) => {
    try {
       const hotels =  await Hotel.find();
        res.status(200).json(hotels);
    } catch (err) {
        next(err)
    }
}

// get hotel CountByCity
export const countByCity = async (req,res, next) => {

    const cities = req.query.cities.split(",");
    try {
       const list =  await Promise.all(cities.map(city=>{
        return Hotel.countDocuments({city:city})
       }))
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
}
