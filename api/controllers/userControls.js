import express, { json } from "express";
import mongoose from "mongoose";
import { errorCreate } from "../utilis/error.js";
import User from "../models/User.js";


// create new hotel
export const adduser = async (req,res, next) => {

    const newuser = new User(req.body);
    try {
        const saveduser = await newuser.save();
        res.status(200).json(saveduser);
    } catch (err) {
        next(err)
    }
};

// update new user
export const updateuser = async (req,res, next) => {
    try {
        const updateduser = await User.findByIdAndUpdate(req.params.id,
        {$set: req.body},
        {new: true})
        res.status(200).json(updateduser);
    } catch (err) {
        next(err)
    }
}

// delete new user
export const deleteuser = async (req,res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
    } catch (err) {
        next(err)
    }
}

// get a new user
export const getuser = async (req,res, next) => {
    try {
       const user =  await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

// get all new user
export const getAllUser = async (req,res, next) => {
    try {
       const users =  await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}
