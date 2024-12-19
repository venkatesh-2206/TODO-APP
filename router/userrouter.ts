import express from "express";
import { login,createUser } from "../controller/usercontroller";

const userRouters = express.Router();

userRouters.post('/login', login); // Attach handler function to route
userRouters.post('/create',createUser );
userRouters.post('/delete', );
export default userRouters;
