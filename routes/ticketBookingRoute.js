import express from "express";
import {
    bookTicket,
    getUserTickets,
    cancelTicket
} from "../controller/ticketBooking.js";
import { isAuthenticated } from "../middleware/authentication.js";

const app = express.Router();

// /api/v1/ticket-booking/book-ticket/:id?query
app.post("/book-ticket/:id", isAuthenticated, bookTicket);

// /api/v1/ticket-booking//my-bookings
app.get("//my-bookings", isAuthenticated, getUserTickets);

// /api/v1/ticket-booking/cancel-ticket/:id
app.delete("/cancel-ticket/:id", isAuthenticated, cancelTicket);

export default app;