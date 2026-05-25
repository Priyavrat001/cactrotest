import { register } from "../controller/authentication.js";
import { login } from "../controller/authentication.js";
import express from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import { logout } from "../controller/authentication.js";

const app = express.Router();

// /api/v1/user/register
app.post("/register", register);

// /api/v1/user/login
app.post("/login", login);

// /api/v1/user/logout
app.get("/logout", isAuthenticated, logout);

export default app;