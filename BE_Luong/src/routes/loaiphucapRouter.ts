import { Router } from "express";
import { phucapController } from "../controllers/loaiphucapController";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware";

const router = Router();
router.get("/loai-phu-cap", verifyToken, phucapController.getAllLoaiPhuCap);
router.get("/loai-phu-cap/:id", verifyToken, phucapController.getLoaiPhuCapById);
router.post("/loai-phu-cap", verifyToken, authorizeRole("admin"), phucapController.createLoaiPhuCap);
router.put("/loai-phu-cap/:id", verifyToken, authorizeRole("admin"), phucapController.updateLoaiPhuCap);
router.delete("/loai-phu-cap/:id", verifyToken, authorizeRole("admin"), phucapController.deleteLoaiPhuCap);

export default router;
