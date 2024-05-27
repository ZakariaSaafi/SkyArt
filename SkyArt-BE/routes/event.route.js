import express from 'express';
import { getEvents, updateEvent, deleteEvent, getEvent, createEvent, participateEvent } from '../controllers/event.controller.js';


const router = express.Router();


router.get("/events",getEvents);
router.post("/events",createEvent);
router.get("/events/:id",getEvent);
router.patch("/events/:id",updateEvent);
router.delete("/events/:id",deleteEvent);
router.post("/events/:id/participate",participateEvent);


export default router;