import { Event } from "../models/Event.js";
import {updateEventNotificationsEmail} from "../features/features.js";

const getSingleEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateEvent = async (req, res) => {
    try {

        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        };

        //is autherized user
        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this event"
            });
        };

        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });

        //update event notification
        updateEventNotificationsEmail(updatedEvent);

        return res.status(201).json({
            success: true,
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getOrganizerEvents = async (req, res) => {
    try {
        const events = await Event.find({ organizer: req.user.id });

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found"
            });
        };

        return res.status(200).json({
            success: true,
            events
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        //is autherized user
        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this event"
            });
        };

        return res.status(201).json({
            success: true,
            message: "Event deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            location,
            totalTickets,
            availableTickets,
            price
        } = req.body;

        if (!title || !date || !location || !totalTickets || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        };

        const event = await Event.create({
            title,
            description,
            date,
            location,
            totalTickets,
            availableTickets:totalTickets,
            organizer: req.user.id,
            price
        });

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found"
            });
        };

        return res.status(200).json({
            success: true,
            events
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    createEvent,
    getSingleEvent,
    getAllEvents,
    updateEvent,
    getOrganizerEvents,
    deleteEvent
}
