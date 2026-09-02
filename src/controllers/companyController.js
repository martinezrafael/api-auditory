import CompanyService from "../services/CompanyService.js";

class CompanyController {
  static createCompany = async (req, res) => {
    const company = await CompanyService.create(req.body);
    res.status(201).json({
      message: "Empresa cadastrada com sucesso.",
      company: company,
    });
  };

  static getAllCompanies = async (req, res) => {
    const allCompanies = await CompanyService.getAll();
    res.status(200).json(allCompanies);
  };

  static getCompanyById = async (req, res) => {
    const company = await CompanyService.getById(req.params.id);
    res.status(200).json(company);
  };

  static updateCompany = async (req, res) => {
    const company = await CompanyService.update(req.params.id, req.body);
    res.status(200).json({
      message: "Dados da empresa atualizados com sucesso.",
      company: company,
    });
  };

  static deleteCompany = async (req, res) => {
    await CompanyService.delete(req.params.id);
    res.status(200).json({
      message: "Dados da empresa deletados com sucesso.",
    });
  };
}

export default CompanyController;
