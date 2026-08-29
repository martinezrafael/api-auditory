import mongoose from "mongoose";
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

      if (company !== null) {
        res.status(200).json(company);
      } else {
        res.status(404).json({
          message: "Empresa não localizada.",
        });
      }
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

      if (company !== null) {
        res.status(200).json({
          message: "Dados da empresa atualizados com sucesso.",
        });
      } else {
        res.status(404).json({
          message: "Empresa não localizada.",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteCompany = async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await companyModel.findByIdAndDelete(id);

      if (company !== null) {
        res.status(200).json({
          message: "Dados da empresa deletados com sucesso.",
        });
      } else {
        res.status(404).json({
          message: "Empresa não localizada.",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default companyController;
