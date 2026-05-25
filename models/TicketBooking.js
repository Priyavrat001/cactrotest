import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },

    quantity:{
        type:Number,
        required:true
    },

    totalPrice:{
        type:Number,
    }

}, {timestamps:true});

export const Booking = mongoose.model("Booking", bookingSchema);