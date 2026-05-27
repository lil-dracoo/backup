import express, { Express } from "express";
import { nhanVienController } from "../controllers/nhanvienController";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware";

const nhanVienRoutes = (app: Express) => {
  const router = express.Router();
  router.get("/", verifyToken, authorizeRole("hr"),nhanVienController.getAllEmployees);
  router.get("/search", verifyToken, authorizeRole("hr"), nhanVienController.searchEmployees);
  router.get("/:cccd", verifyToken, authorizeRole("hr"),nhanVienController.getEmployeeDetail);
  app.use("/api/nhan-vien", router);
};

export default nhanVienRoutes;