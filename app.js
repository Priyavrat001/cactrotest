import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectToDb } from "./config/db.js";
import authenticationRoute from "./routes/authenticationRoute.js";
import eventRoute from "./routes/eventRoute.js";
import ticketBookingRoute from "./routes/ticketBookingRoute.js";

dotenv.config({});

const app = express();
const port = process.env.PORT || 4000;
connectToDb(process.env.MONGO_URI)

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/user", authenticationRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/ticket-booking", ticketBookingRoute);

app.listen(port,()=>{
    console.log(`port is running on ${port}`);
});