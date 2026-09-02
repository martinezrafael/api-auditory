import DocumentService from "../services/DocumentService.js";

class DocumentController {
  static createDocument = async (req, res) => {
    const document = await DocumentService.create(req.body);
    res.status(201).json({
      message: "Documento cadastrado com sucesso.",
      document: document,
    });
  };

  static getAllDocuments = async (req, res) => {
    const allDocuments = await DocumentService.getAll();
    res.status(200).json(allDocuments);
  };

  static getDocumentById = async (req, res) => {
    const document = await DocumentService.getById(req.params.id);
    res.status(200).json(document);
  };

  static updateDocument = async (req, res) => {
    const document = await DocumentService.update(req.params.id, req.body);
    res.status(200).json({
      message: "Dados do documento atualizados com sucesso.",
      document: document,
    });
  };

  static deleteDocument = async (req, res) => {
    await DocumentService.delete(req.params.id);
    res.status(200).json({
      message: "Dados do documento deletados com sucesso.",
    });
  };
}

export default DocumentController;
