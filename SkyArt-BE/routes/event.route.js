import express from 'express';
import { getEvents, updateEvent, deleteEvent, getEvent, createEvent } from '../controllers/event.controller.js';


const router = express.Router();


router.get("/events",getEvents);
router.post("/events",createEvent);
router.get("/events/:id",getEvent);
router.put("/events/:id",updateEvent);
router.delete("/events/:id",deleteEvent);

export default router;