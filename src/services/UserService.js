// CONFIGURAÇÕES
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SERVICES
import BaseService from "./BaseService.js";

// REPOSITORIES
import userRepository from "../repositories/UserRepository.js";
import companyRepository from "../repositories/CompanyRepository.js";

//MIDDLEWARES
import { authorize } from "./authGuard.js";

class UserService extends BaseService {
  constructor() {
    super(userRepository, [
      // PARA AS EMPRESAS POPULADAS NO PERFIL DO USUÁRIO, VAMOS EXIBIR `legalName` e `documentNumber`
      { path: "companies", select: "legalName documentNumber" },
    ]);
  }

  // MÉTODO PARA CRIAÇÃO DE UM NOVO USUÁRIO POR UM PERFIL 'ADMIN'
  async adminCreateUser(userData, creator) {
    // 1. Autorização — regra única, reutilizável em qualquer outro método
    authorize(creator, "MANAGE_USERS");

    // 2. Criptografia da senha antes de salvar no banco
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    // 3. Cria o registro do novo usuário via BaseService
    const newUser = await super.create(userData);

    // 4. Garante que 'companies' seja tratado como uma lista (array)
    const companyIds = userData.companies || newUser.companies || [];

    // Se o novo usuário for BUSINESS_OWNER e tiver empresas associadas, vincula-o como owner delas
    if (newUser.role === "BUSINESS_OWNER" && companyIds.length > 0) {
      for (const companyId of companyIds) {
        const company = await companyRepository.findById(companyId);

        if (company) {
          const alreadyOwner = company.owners.some(
            (owner) => owner.toString() === newUser._id.toString(),
          );

          if (!alreadyOwner) {
            company.owners.push(newUser._id);
            await company.save();
          }
        }
      }
    }

    // 5. Converte o documento para objeto e remove a senha do retorno por segurança
    const userResponse = newUser.toObject ? newUser.toObject() : { ...newUser };
    delete userResponse.password;

    // 6. Retorna apenas os dados do usuário criado
    return userResponse;
  }

  async update(userId, userData) {
    // 1. Busca os dados atuais do usuário antes de aplicar as alterações
    const user = await userRepository.findById(userId);

    // 2. Verifica se houve alteração de perfil e se o usuário está deixando de ser 'BUSINESS_OWNER'
    if (
      user &&
      userData.role &&
      user.role === "BUSINESS_OWNER" &&
      userData.role !== "BUSINESS_OWNER"
    ) {
      // 3. Localiza todas as empresas em que este usuário está registrado como proprietário (owner)
      const companies = await companyRepository.findAll({ owners: userId });

      for (const company of companies) {
        // 4. Filtra a lista de owners da empresa, removendo o usuário atual
        const remainingOwners = company.owners.filter(
          (owner) => owner.toString() !== userId.toString(),
        );

        // 5. Impede a alteração se a empresa for ficar sem nenhum 'BUSINESS_OWNER' responsável
        if (remainingOwners.length === 0) {
          throw new Error(
            `Não é possível remover a role 'BUSINESS_OWNER'. É necessário nomear outro responsável para a empresa ${company.legalName}.`,
          );
        }

        // 6. Atualiza e persiste a nova lista de proprietários da empresa
        company.owners = remainingOwners;
        await company.save();
      }
    }

    // 7. Executa a atualização dos dados do usuário através da classe base
    return await super.update(userId, userData);
  }

  async create(userData) {
    // 1. Criptografa a senha do usuário antes de salvar no banco
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    // 2. Cria o registro do novo usuário no banco de dados via serviço base
    const newUser = await super.create(userData);

    // 3. Se o usuário for 'BUSINESS_OWNER' e tiver uma empresa vinculada no cadastro
    if (newUser.company && newUser.role === "BUSINESS_OWNER") {
      const company = await companyRepository.findById(newUser.company);

      if (company) {
        // Verifica se o ID do novo usuário já consta na lista de owners da empresa
        const alreadyOwner = company.owners.some(
          (owner) => owner.toString() === newUser._id.toString(),
        );

        // Adiciona o usuário como owner caso ele ainda não esteja presente e salva as alterações
        if (!alreadyOwner) {
          company.owners.push(newUser._id);
          await company.save();
        }
      }
    }

    // 4. Gera o token JWT para autenticação imediata pós-cadastro
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }, // Token válido por 1 dia
    );

    // 5. Converte para objeto simples e remove a senha do retorno por segurança
    const userResponse = newUser.toObject ? newUser.toObject() : { ...newUser };
    delete userResponse.password;

    // 6. Retorna o usuário tratado junto com o token
    return {
      user: userResponse,
      token,
    };
  }

  async findCreatedCompanies(userId) {
    // Busca e retorna todas as empresas onde o campo 'createdBy' seja igual ao ID do usuário informado
    return await companyRepository.findAll({ createdBy: userId });
  }
}

export default new UserService();
