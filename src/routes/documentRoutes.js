import express from "express";
import DocumentController from "../controllers/documentController.js";

const routes = express.Router();

routes.post("/documents", DocumentController.createDocument);
routes.get("/documents", DocumentController.getAllDocuments);
routes.get("/documents/:id", DocumentController.getDocumentById);
routes.put("/documents/:id", DocumentController.updateDocument);
routes.delete("/documents/:id", DocumentController.deleteDocument);

export default routes;
