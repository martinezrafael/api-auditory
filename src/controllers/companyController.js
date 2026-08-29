import NotFoundError from "../errors/NotFoundError.js";
import companyModel from "../models/Company.js";

class companyController {
  static createCompany = async (req, res, next) => {
    try {
      const companyCreated = new companyModel(req.body);
      const companySaved = await companyCreated.save();

      res.status(201).json({
        message: "Empresa criada com sucesso.",
        company: companySaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllCompanies = async (req, res, next) => {
    try {
      const allCompanies = await companyModel.find();

      res.status(200).json(allCompanies);
    } catch (error) {
      next(error);
    }
  };

  static getCompanyById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await companyModel.findById(id);

      if (!company) {
        return next(new NotFoundError("Empresa não localizada."));
      }

      res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  };

  static updateCompany = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const company = await companyModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!company) {
        return next(new NotFoundError("Empresa não localizada."));
      }

      res.status(200).json({
        message: "Dados da empresa atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteCompany = async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await companyModel.findByIdAndDelete(id);

      if (!company) {
        return next(new NotFoundError("Empresa não localizada."));
      }

      res.status(200).json({
        message: "Dados da empresa deletados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default companyController;
