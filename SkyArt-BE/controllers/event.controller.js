import Event from '../models/Event.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const getEvents = async (req, res, next) => {
    
try {
    const event = await Event.find({});
    res.status(200).json({event});
} catch (error) {
    next(error);
}
};

export const getEvent = async (req, res) => { 
    const { id } = req.params;

    try {
        const user = await Event.findById(id);
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEvent = async (req, res) => {
    const { title, fromDate, nbrAttendees, isExpired, organizedBy, link, isPaid} = req.body;

    const newEvent = new Event({ title, fromDate, nbrAttendees, isExpired, organizedBy, link, isPaid })

    try {
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, fromDate, endDate, nbrAttendees, isExpired, organizedBy, link, isPaid} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ,${id}`);

    const updatedEvent = { title, fromDate, endDate, nbrAttendees, isExpired, organizedBy, link, isPaid, _id: id };

    await User.findByIdAndUpdate(id, updatedEvent, { new: true });

    res.json(updatedEvent);
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully." });

};