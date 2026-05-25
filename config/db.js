import mongoose from "mongoose";

const connectToDb = async(uri)=>{
    try {
         await mongoose.connect(uri);
        console.log("db connected")
    } catch (error) {
        console.error(error.message)
    }
};

export {
    connectToDb,
}