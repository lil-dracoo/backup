import express, { Express } from "express";
import { login } from "../controllers/authController";
import {authValidation} from "../validations/authValidation";

const router = express.Router();

const authRoutes = (app: Express) => {
  const router = express.Router();

  router.post("/login", authValidation.validateLogin, login); 
  app.use("/api/auth", router); 
};


export default authRoutes;