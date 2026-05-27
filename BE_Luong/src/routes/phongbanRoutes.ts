import express, { Express } from "express";
import { phongBanController } from "../controllers/phongbanController";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware";
import { phongBanValidation } from "../validations/phongbanValidations";


const phongBanRoutes = (app: Express) => {
    const router = express.Router();

    router.get("/", verifyToken, authorizeRole("admin"),phongBanController.getAllDept);
    router.post ("/create-dept", verifyToken, authorizeRole("admin"), phongBanValidation.validateCreate, phongBanController.createDept);
    router.put ("/update-dept/:id", verifyToken, authorizeRole("admin"),phongBanValidation.validateUpdate, phongBanController.updateDept);
    router.get ("/:id", verifyToken, authorizeRole("admin"), phongBanController.getDeptDetail);
    router.delete("/delete-dept/:id", verifyToken, authorizeRole("admin"), phongBanController.deleteDept);
    app.use("/api/phong-ban", router);
};

export default phongBanRoutes;