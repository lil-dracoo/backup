import express, { Express } from "express";
import { chucVuController } from "../controllers/chucvuController";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware";
import { chucVuValidation } from "../validations/chucvuValidation";


const chucVuRoutes = (app: Express) => {
    const router = express.Router();

    router.get("/", verifyToken, authorizeRole("admin"),chucVuController.getAllPos);
    router.post ("/create-pos", verifyToken, authorizeRole("admin"), chucVuValidation.validateCreate, chucVuController.createPos);
    router.put ("/update-pos/:id", verifyToken, authorizeRole("admin"), chucVuValidation.validateUpdate, chucVuController.updatePos);
    router.get ("/:id", verifyToken, authorizeRole("admin"), chucVuController.getPosDetail);
    router.delete("/delete-pos/:id", verifyToken, authorizeRole("admin"), chucVuController.deletePos);
    app.use("/api/chuc-vu", router);
};

export default chucVuRoutes;