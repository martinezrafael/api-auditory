import express from "express";
import documentController from "../controllers/documentController.js";

const routes = express.Router();

routes.post("/documents", documentController.createDocument);
routes.get("/documents", documentController.getAllDocuments);
routes.get("/documents/:id", documentController.getDocumentById);
routes.put("/documents/:id", documentController.updateDocument);
routes.delete("/documents/:id", documentController.deleteDocument);

export default routes;
