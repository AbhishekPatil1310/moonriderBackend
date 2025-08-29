import { getAllUsers,addUser,deleteUser,updateUser } from "../controller/user.controller.js";
import express from "express";

const userRouter = express.Router();

userRouter.get("/getAllUser", getAllUsers);
userRouter.post("/addUser", addUser);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.put("/updateUser/:id", updateUser);

export default userRouter;