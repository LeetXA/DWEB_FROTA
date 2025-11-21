import { Router } from "express";
import * as controller from "../controllers/veiculosController.js";
const router = Router();
router.get("/", controller.listVeiculos);
router.get("/:id", controller.getVeiculo);
router.post("/", controller.createVeiculo);
router.put("/:id", controller.updateVeiculo);
router.put("/", controller.updateVeiculosEmLote);
router.delete("/:id", controller.deleteVeiculo);
router.delete("/", controller.deleteVeiculosEmLote);


export default router;