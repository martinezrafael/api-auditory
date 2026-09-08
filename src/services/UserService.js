import "dotenv/config";
import BaseService from "./BaseService.js";
import userRepository from "../repositories/UserRepository.js";
import companyRepository from "../repositories/CompanyRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService extends BaseService {
  constructor() {
    super(userRepository, [
      { path: "companies", select: "legalName documentNumber" },
    ]);
  }

  // ADMIN
  async adminCreateUser(userData, creatorId) {
    // 1. VALIDA SE QUEM ESTÁ REALIZANDO O CADASTRO É UM ADMIN E ESTÁ ATIVO NA PLATAFORMA
    if (!creatorId) {
      throw new Error("ID do usuário criador não foi fornecido.");
    }

    const creator = await userRepository.findById(creatorId);

    // SE NÃO FOR FORNECIDO O ID DO USUÁRIO QUE ESTÁ CRIANDO O NOVO USUÁRIO
    // SE O ROLE DO USUÁRIO QUE ESTÁ CRIANDO FOR DIFERENTE DE ADMIN
    // SE O USUÁRIO QUE ESTIVER CRIANDO NÃO ESTIVER ATIVO NA PLATAFORMA
    if (!creator || creator.role !== "ADMIN" || !creator.isActive) {
      throw new Error(
        "Acesso negado: Apenas administradores ativos na plataforma podem criar novos usuários por este fluxo.",
      );
    }

    // 2. CRIPTOGRAFIA DA SENHA ANTES DE SALVAR NO BANCO
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    // 3. CRIA O REGISTRO DO NOVO USUÁRIO VIA 'BaseService'
    const newUser = await super.create(userData);

    // 4. GARANTE QUE 'companies' SEJA TRATADO COMO UMA LISTA (ARRAY)
    const companyIds = userData.companies || newUser.companies || [];

    // SE O NOVO USUÁRIO FOR 'BUSINESS_OWNER' E TIVER EMPRESA ASSOCIADAS, VINCULA-O COMO OWNER DELAS
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

    // 5. CONVERTE O DOCUMENTO PARA OBJETO E REMOVE A SENHA DO RETORNO POR SEGURANÇA
    const userResponse = newUser.toObject ? newUser.toObject() : { ...newUser };
    delete userResponse.password;

    // 6. RETORNA APENAS OS DADOS DO USUÁRIO CRIADO
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
