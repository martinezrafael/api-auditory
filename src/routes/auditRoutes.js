import express from "express";
import auditController from "../controllers/auditController.js";

const routes = express.Router();

routes.post("/audits", auditController.createAudit);
routes.get("/audits", auditController.getAllAudits);
routes.get("/audits/:id", auditController.getAuditById);
routes.put("/audits/:id", auditController.updateAudit);
routes.delete("/audits/:id", auditController.deleteAudit);

export default routes;
