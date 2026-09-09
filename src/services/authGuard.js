import PERMISSIONS from "../config/permissions.js";
import ForbiddenError from "../errors/ForbiddenError.js";

/**
 * Verifica se um usuário pode executar uma ação.
 * @param {object} user - documento do usuário autenticado (já carregado)
 * @param {string} action - chave de PERMISSIONS (ex: "EDIT_COMPANY")
 * @param {object} [context] - dados para checagem de escopo, ex: { companyId }, { assignedTo }, { targetUserId }
 * @returns {boolean}
 */
function can(user, action, context = {}) {
  // VERIFICA SE HÁ UM USUÁRIO OU SE O USUÁRIO ESTÁ ATIVO
  if (!user || !user.isActive) return false;

  // ARMAZENA A CHAVE DE PERMISSÃO
  const rule = PERMISSIONS[action];

  // VERIFICA SE HÁ UMA CHAVE DE PERMISSÃO
  if (!rule) {
    throw new Error(`Ação de permissão desconhecida: '${action}'.`);
  }

  // ADMIN SEMPRE PASSA, IDEPENDENTE DE ESCOPO
  if (user.role === "ADMIN") return true;

  // VERRIFICA SE A ROLE DO USUÁRIO ESTÁ NA LISTA DE ROLES
  if (!rule.roles.includes(user.role)) return false;

  // SEM RESTRIÇÃO DE ESCOPO - ROLE JÁ BASTA
  if (!rule.scoped) return true;

  // RESTRITO À(S) PRÓPRIAS EMPRESA(S) DO USUÁRIO
  if (rule.scoped === true) {
    const userCompanyIds = (user.companies || []).map((c) => c.toString());
    return userCompanyIds.includes(String(context.companyId));
  }

  // RESTRITO AO QUE FOI ATRIBUÍDO AO USUÁRIO (EX: auditor em audits.auditor)
  if (rule.scoped === "assigned") {
    return String(context.assignedTo) === String(user._id);
  }

  // RESTITO AO PRÓPRIO USUÁRIO (EX: VER/EDITAR O PRÓPRIO PERFIL)
  if (rule.scoped === "self") {
    return String(context.targetUserId) === String(user._id);
  }

  return false;
}

/**
 * Lança ForbiddenError se o usuário não puder executar a ação.
 */
function authorize(user, action, context = {}) {
  if (!can(user, action, context)) {
    throw new ForbiddenError(
      `Acesso negado: seu papel (${user?.role ?? "undefined"}) não permite executar '${action}'.`,
    );
  }
}

export { can, authorize };
