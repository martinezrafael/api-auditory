import mongoose from "mongoose";
import BaseService from "./BaseService.js";
import companyRepository from "../database/repositories/CompanyRepository.js";
import userRepository from "../database/repositories/UserRepository.js";

class CompanyService extends BaseService {
  constructor() {
    super(companyRepository);
  }

  async validateCompanyUniqueness(documentNumber, legalName) {
    const existingCnpj = await this.repository.findByCnpj(documentNumber);
    if (existingCnpj) {
      const error = new Error("Este CNPJ já está em uso no sistema.");
      error.statusCode = 400;
      throw error;
    }

    const existingLegalName = await this.repository.findByLegalName(legalName);
    if (existingLegalName) {
      const error = new Error("Esta Razão Social já está em uso no sistema.");
      error.statusCode = 400;
      throw error;
    }
  }

  /**
   * Cria uma empresa e seu usuário inicial de forma atômica.
   */
  async createWithUser({ companyData, userData }) {
    await this.validateCompanyUniqueness(
      companyData.documentNumber,
      companyData.legalName,
    );

    // Valida se e-mail do usuário já existe
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      const error = new Error("Este e-mail de usuário já está em uso.");
      error.statusCode = 400;
      throw error;
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const userId = new mongoose.Types.ObjectId();

      // 1. Cria a empresa
      const [company] = await this.repository.create(
        [
          {
            ...companyData,
            createdBy: userId,
          },
        ],
        { session },
      );

      // 2. Cria o usuário apontando para a empresa
      const [user] = await userRepository.create(
        [
          {
            _id: userId,
            ...userData,
            company: company._id,
          },
        ],
        { session },
      );

      await session.commitTransaction();
      session.endSession();

      return { company, user };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  /**
   * Adiciona um novo usuário a uma empresa existente.
   */
  async addUserToCompany(companyId, userData) {
    const company = await this.getById(companyId);

    // Valida e-mail duplicado
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      const error = new Error("Este e-mail de usuário já está em uso.");
      error.statusCode = 400;
      throw error;
    }

    // Cria o usuário com vínculo na empresa
    const user = await userRepository.create({
      ...userData,
      company: company._id,
    });

    return user;
  }

  async getAll() {
    return this.repository.findCompanies();
  }

  async getById(id) {
    const company = await this.repository.findCompanyById(id);

    if (!company) {
      const error = new Error("Empresa não encontrada.");
      error.statusCode = 404;
      throw error;
    }

    return company;
  }

  /**
   * Soft Delete da empresa e exclusão em cascata dos seus usuários.
   */
  async delete(id) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedCompany = await this.repository.delete(id, { session });

      if (!deletedCompany) {
        const error = new Error("Empresa não encontrada para exclusão.");
        error.statusCode = 404;
        throw error;
      }

      // Desativa todos os usuários vinculados à empresa em cascata
      await userRepository.softDeleteByCompany(id, session);

      await session.commitTransaction();
      session.endSession();

      return deletedCompany;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

export default new CompanyService();
