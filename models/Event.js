import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    totalTickets:{
        type:Number,
        required:true
    },
    availableTickets:{
        type:Number,
    },
    organizer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    price:{
        type:Number,
        required:true
    }
}, {timestamps:true});

export const Event = mongoose.model("Event", eventSchema);