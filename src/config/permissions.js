// Fonte única de verdade da matriz RBAC.
// ADMIN sempre tem acesso total — validado automaticamente em authGuard.js,
// não precisa ser listado em cada regra.

const PERMISSIONS = {
  MANAGE_USERS: { roles: ["ADMIN"] },

  CREATE_COMPANY: { roles: ["ADMIN", "BUSINESS_OWNER"] },
  EDIT_COMPANY: { roles: ["ADMIN", "BUSINESS_OWNER"], scoped: true },

  CREATE_BANK: { roles: ["ADMIN", "BANK_MANAGER"] },
  CREATE_BANK_ACCOUNT: {
    roles: ["ADMIN", "BUSINESS_OWNER", "BANK_MANAGER"],
    scoped: true,
  },
  REGISTER_BANK_TRANSACTION: {
    roles: ["ADMIN", "BUSINESS_OWNER", "BANK_MANAGER"],
    scoped: true,
  },

  CREATE_ACQUIRER: { roles: ["ADMIN", "BUSINESS_OWNER"], scoped: true },
  CREATE_CONTRACT_FEE: { roles: ["ADMIN", "BUSINESS_OWNER"], scoped: true },

  REGISTER_CARD_TRANSACTION: {
    roles: ["ADMIN", "BUSINESS_OWNER"],
    scoped: true,
  },
  VIEW_CARD_TRANSACTIONS: {
    roles: ["ADMIN", "AUDITOR", "BUSINESS_OWNER"],
    scoped: true,
  },

  REGISTER_SETTLEMENT: { roles: ["ADMIN", "BUSINESS_OWNER"], scoped: true },
  VIEW_SETTLEMENTS: {
    roles: ["ADMIN", "AUDITOR", "BUSINESS_OWNER"],
    scoped: true,
  },

  OPEN_AUDIT: { roles: ["ADMIN"] },
  CONDUCT_AUDIT: { roles: ["ADMIN", "AUDITOR"], scoped: "assigned" },

  UPLOAD_DOCUMENT: { roles: ["ADMIN", "BUSINESS_OWNER"], scoped: true },
  VALIDATE_DOCUMENT: { roles: ["ADMIN", "AUDITOR"] },

  REQUEST_CREDIT: { roles: ["ADMIN", "BUSINESS_OWNER"], scoped: true },
  ANALYZE_CREDIT_REQUEST: { roles: ["ADMIN", "BANK_MANAGER"] },
  CREATE_CREDIT_OFFER: { roles: ["ADMIN", "BANK_MANAGER"] },
  DECIDE_CREDIT_OFFER: { roles: ["ADMIN", "BUSINESS_OWNER"], scoped: true },

  // Caso de auto-gerenciamento de perfil (opcional — ver observação no final)
  VIEW_OWN_PROFILE: {
    roles: ["ADMIN", "AUDITOR", "BUSINESS_OWNER", "BANK_MANAGER"],
    scoped: "self",
  },
};

export default PERMISSIONS;
