import { Event } from "../models/Event.js";
import { User } from "../models/User.js";

const sendBookingConfirmationEmail = async(booking)=>{
    const event = await Event.findById(booking.event);
    const user = await User.findById(booking.customer._id);
      setTimeout(() => {
        console.log(`
        =========================
        BOOKING CONFIRMATION EMAIL
        =========================
        User: ${user.name}
        Event: ${event.title}
        quantity: ${booking.quantity}
        Price: ${booking.totalPrice}
        Status: Email Sent Successfully
        `);
    }, 0);
};

const updateEventNotificationsEmail = (event)=>{
   setTimeout(() => {
        console.log(`
        =========================
        EVENT UPDATE NOTIFICATION
        =========================
        Event: ${event.title}
        Message: Event details updated
        Notifications sent to all users
        `);
    }, 0);
};

export {
    sendBookingConfirmationEmail,
    updateEventNotificationsEmail
}