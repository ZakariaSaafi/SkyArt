import Event from '../models/Event.js';
import mongoose from 'mongoose';


export const getEvents = async (req, res, next) => {
    
try {
    const event = await Event.find();
    res.status(200).json(event);
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
    const { title, fromDate, endDate, nbrAttendees, isExpired, organizedBy, link, isPaid} = req.body;

    const newEvent = new Event({ title, fromDate, endDate, nbrAttendees, isExpired, organizedBy, link, isPaid })

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
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ,${id}`);

    const updatedEvent = { title, fromDate, endDate, nbrAttendees, isExpired, organizedBy, link, isPaid, _id: id };

    await Event.findByIdAndUpdate(id, updatedEvent, { new: true });

    res.json(updatedEvent);
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);

    await Event.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully." });

};

export const participateEvent = async(req, res) => {
        const { eventId } = req.params;
        const { userId } = req.user;
        try {
          const event = await Event.findById(eventId);
          if (!event) {
            return res.status(404).json({ message: 'Event not found' });
          }
      
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          if (!event.participants.includes(userId)) {
            event.participants.push(userId);
            await event.save();
          } else {
            return res.status(400).json({ message: 'User already participating' });
          }
      
          res.status(200).json(event);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      };


