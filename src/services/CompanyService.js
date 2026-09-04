import BaseService from "./BaseService.js";
import companyRepository from "../repositories/CompanyRepository.js";
import userRepository from "../repositories/UserRepository.js";

class CompanyService extends BaseService {
  constructor() {
    super(companyRepository, [
      { path: "owners", select: "fullName role" },
      { path: "createdBy", select: "fullName role" },
    ]);
  }

  async create(companyData, userId) {
    // 1. Define o ID do usuário responsável, priorizando o parâmetro 'userId' ou utilizando o 'createdBy' vindo do payload
    const idToValidate = userId || companyData.createdBy;

    // 2. Busca o usuário no banco de dados para validar sua existência
    const user = await userRepository.findById(idToValidate);

    // 3. Garante a regra de negócio: o criador/responsável deve obrigatoriamente possuir o perfil 'BUSINESS_OWNER'
    if (!user || user.role !== "BUSINESS_OWNER") {
      throw new Error(
        "O usuário informado deve possuir a role 'BUSINESS_OWNER'.",
      );
    }

    // 4. Atribui o ID do usuário como criador e o define como o primeiro proprietário (owner) da empresa
    companyData.createdBy = user._id;
    companyData.owners = [user._id];

    // 5. Salva a nova empresa no banco de dados utilizando a implementação base do serviço
    const newCompany = await super.create(companyData);

    // 6. Atualiza a lista de empresas do usuário, adicionando a nova empresa criada mantendo as anteriores
    const updatedCompanies = [...(user.companies || []), newCompany._id];
    await userRepository.update(user._id, { companies: updatedCompanies });

    // 7. Retorna o documento da empresa recém-criada
    return newCompany;
  }
}

export default new CompanyService();
