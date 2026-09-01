import express from "express";
import AuditController from "../controllers/auditController.js";

const routes = express.Router();

routes.post("/audits", AuditController.createAudit);
routes.get("/audits", AuditController.getAllAudits);
routes.get("/audits/:id", AuditController.getAuditById);
routes.put("/audits/:id", AuditController.updateAudit);
routes.delete("/audits/:id", AuditController.deleteAudit);

export default routes;
