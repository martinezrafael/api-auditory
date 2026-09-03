import express from "express";
import DocumentController from "../controllers/documentController.js";

const routes = express.Router();

routes.post("/documents", DocumentController.create);
routes.get("/documents", DocumentController.getAll);
routes.get("/documents/:id", DocumentController.getById);
routes.put("/documents/:id", DocumentController.update);
routes.delete("/documents/:id", DocumentController.delete);

export default routes;
