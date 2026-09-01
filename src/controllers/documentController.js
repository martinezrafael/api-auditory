import NotFoundError from "../errors/NotFoundError.js";
import documentModel from "../models/auditing/Document.js";

class DocumentController {
  static createDocument = async (req, res, next) => {
    try {
      const documentCreated = new documentModel(req.body);
      const documentSaved = await documentCreated.save();

      res.status(201).json({
        message: "Documento registrado com sucesso",
        document: documentSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllDocuments = async (req, res, next) => {
    try {
      const allDocuments = await documentModel.find();
      res.status(200).json(allDocuments);
    } catch (error) {
      next(error);
    }
  };

  static getDocumentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const document = await documentModel.findById(id);

      if (!document) {
        return next(new NotFoundError("Documento não localizado."));
      }

      res.status(200).json(document);
    } catch (error) {
      next(error);
    }
  };

  static updateDocument = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const document = await documentModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!document) {
        return next(new NotFoundError("Documento não localizado."));
      }

      res.status(200).json({
        message: "Dados do documento atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteDocument = async (req, res, next) => {
    try {
      const { id } = req.params;
      const document = await documentModel.findByIdAndDelete(id);

      if (!document) {
        return next(new NotFoundError("Documento não localizado."));
      }

      res.status(200).json({
        message: "Dados do documento deletados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default DocumentController;
