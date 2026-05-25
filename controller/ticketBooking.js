import { Event } from "../models/Event.js";
import { Booking } from "../models/TicketBooking.js";
import { sendBookingConfirmationEmail } from "../features/features.js";

const bookTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.query;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (event.availableTickets < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough tickets available"
            });
        }

        event.availableTickets -= quantity;
        await event.save();

        const booking = await Booking.create({
            customer: req.user.id,
            event: id,
            quantity,
            totalPrice: quantity * event.price
        });

        // Send booking confirmation email to the user
        sendBookingConfirmationEmail(booking);

        return res.status(200).json({
            success: true,
            message: "Ticket booked successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUserTickets = async (req, res) => {
    try {
        const bookings = await Booking.find({ customer: req.user.id }).populate("event");

        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            });
        };
        return res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

const cancelTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket canceled successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    bookTicket,
    getUserTickets,
    cancelTicket
}