import express from "express";
import AuditController from "../controllers/auditController.js";

const routes = express.Router();

routes.post("/audits", AuditController.create);
routes.get("/audits", AuditController.getAll);
routes.get("/audits/:id", AuditController.getById);
routes.put("/audits/:id", AuditController.update);
routes.delete("/audits/:id", AuditController.delete);

export default routes;
