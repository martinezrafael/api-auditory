import companyModel from "../models/Company.js";

class companyController {
  static createCompany = async (req, res) => {
    try {
      const companyCreated = new companyModel(req.body);
      const companySaved = await companyCreated.save();
      res.status(201).json({
        message: `Empresa criada com sucesso: \n ${companySaved.toJSON()}`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Erro interno de servidor: \n ${error}`,
      });
    }
  };
}

export default companyController;
