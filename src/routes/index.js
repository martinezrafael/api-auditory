import express from "express";
import userRoutes from "./userRoutes.js";
import companyRoutes from "./companyRoutes.js";
import bankRoutes from "./bankRoutes.js";
import bankAccountRoutes from "./bankAccountRoutes.js";
import bankTransactionRoutes from "./bankTransactionRoutes.js";
import settlementRoutes from "./settlementRoutes.js";
import creditRequestRoutes from "./creditRequestRoutes.js";
import creditOfferRoutes from "./creditOfferRoutes.js";
import cardAcquirerRoutes from "./cardAcquirerRoutes.js";
import cardTransactionRoutes from "./cardTransactionRoutes.js";
import contractFeeRoutes from "./contractFeeRoutes.js";
import auditRoutes from "./auditRoutes.js";
import documentRoutes from "./documentRoutes.js";

/**
 * Função responsável por registrar todos os middlewares globais e os roteadores da aplicação Express.
 * Concentra a inicialização de todos os módulos de rotas do sistema.
 *
 * @param {express.Express} app - Instância da aplicação Express.
 * @returns {void}
 */
const routes = (app) => {
  // Middleware para parsing de corpos de requisição em formato JSON
  app.use(express.json());

  // Módulo de Usuários
  app.use(userRoutes);

  // Módulo de Empresas
  app.use(companyRoutes);

  // Módulo Bancário (Bancos, Contas Bancárias e Transações Bancárias)
  app.use(bankRoutes);
  app.use(bankAccountRoutes);
  app.use(bankTransactionRoutes);

  // Módulo de Liquidações / Repasses
  app.use(settlementRoutes);

  // Módulo de Crédito (Solicitações e Ofertas)
  app.use(creditRequestRoutes);
  app.use(creditOfferRoutes);

  // Módulo de Adquirentes / Credenciadoras
  app.use(cardAcquirerRoutes);

  // Módulo de Transações de Cartão
  app.use(cardTransactionRoutes);

  // Módulo de Taxas Contratuais
  app.use(contractFeeRoutes);

  // Módulo de Auditoria
  app.use(auditRoutes);

  // Módulo de Documentos
  app.use(documentRoutes);
};

export default routes;
