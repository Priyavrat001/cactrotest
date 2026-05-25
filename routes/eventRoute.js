import express from "express";
import {
    createEvent,
    getSingleEvent,
    getAllEvents,
    updateEvent,
    getOrganizerEvents,
    deleteEvent
} from "../controller/event.js";
import { isAuthenticated, isAutherizedRole } from "../middleware/authentication.js";

const app = express.Router();

// /api/v1/event/create-event
app.post("/create-event", isAuthenticated, isAutherizedRole, createEvent);

// /api/v1/event/get-events
app.get("/get-events", isAuthenticated, getAllEvents);

// /api/v1/event/get-organizer-events
app.get("/get-organizer-events", isAuthenticated, isAutherizedRole, getOrganizerEvents);

// /api/v1/event/get-event/:id
app.get("/get-event/:id", isAuthenticated, isAutherizedRole, getSingleEvent);

// /api/v1/event/update-event/:id
app.put("/update-event/:id", isAuthenticated, isAutherizedRole, updateEvent);

// /api/v1/event/delete-event/:id
app.delete("/delete-event/:id", isAuthenticated, isAutherizedRole, deleteEvent);

export default app;