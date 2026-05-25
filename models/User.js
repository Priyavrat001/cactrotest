import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select:false
    },

    role: {
        type: String,
        enum: ['customer', 'organizer'],
        default: 'customer',
        required: true
    },
},
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema)