import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import BikeRouter from "./src/routes/BikeData.route.js";
import userRouter from "./src/routes/user.route.js";

dotenv.config();
import authRoutes from "./src/routes/auth.router.js";
import contactRouter from "./src/routes/contact.route.js";
import "./src/config/passport.js"; // Google OAuth strategy

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bikedata", BikeRouter);
app.use("/api/users", userRouter);
app.use("/api/contact", contactRouter);

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
