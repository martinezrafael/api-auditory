import mongoose from "mongoose";

/**
 * Interface do documento de Oferta de Crédito.
 *
 * @typedef {Object} ICreditOffer
 * @property {mongoose.Types.ObjectId} creditRequest - ID da solicitação de crédito vinculada a esta oferta.
 * @property {mongoose.Types.ObjectId} [bank] - ID da instituição bancária parceira que fez a oferta (opcional).
 * @property {Date} offerDate - Data em que a proposta de crédito foi disponibilizada.
 * @property {number} offeredAmount - Valor total do crédito oferecido ao cliente/empresa.
 * @property {number} interestRate - Taxa de juros aplicada na proposta (percentual).
 * @property {number} totalCost - Custo Efetivo Total (CET) daoperação financeira.
 * @property {Date} expirationDate - Data de validade da proposta de crédito.
 * @property {"PENDING"|"ACCEPTED"|"REJECTED"|"EXPIRED"} status - Estado atual da oferta de crédito.
 */

/**
 * Esquema do Mongoose para a coleção de Ofertas de Crédito (`creditOffers`).
 * Define a estrutura dos documentos, validações, referências de entidades e enum de status da proposta.
 */
const CreditOfferModel = new mongoose.Schema({
  /**
   * Referência à solicitação de crédito correspondente.
   * @type {mongoose.Schema.Types.ObjectId}
   * @see {@link CreditRequest} - Relacionamento com o model/coleção 'creditRequests'.
   */
  creditRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creditRequests",
    required: [true, "O campo 'Solicitação de crédito' é obrigatório."],
  },

  /**
   * Referência ao banco emissor da proposta.
   * @type {mongoose.Schema.Types.ObjectId}
   * @see {@link Bank} - Relacionamento com o model/coleção 'banks'.
   */
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "banks",
  },

  /**
   * Data em que a oferta foi disponibilizada pela instituição.
   * @type {Date}
   */
  offerDate: {
    type: Date,
    required: [true, "O campo 'Data da oferta' é obrigatório."],
  },

  /**
   * Valor total do limite/crédito oferecido.
   * @type {number}
   */
  offeredAmount: {
    type: Number,
    required: [true, "O campo 'Valor oferecido' é obrigatório."],
  },

  /**
   * Taxa de juros incidente (em valor percentual).
   * @type {number}
   */
  interestRate: {
    type: Number,
    required: [true, "O campo 'Taxa de juros' é obrigatório."],
  },

  /**
   * Custo financeiro total resultante do montante acrescido dos juros e tarifas.
   * @type {number}
   */
  totalCost: {
    type: Number,
    required: [true, "O campo 'Custo total' é obrigatório."],
  },

  /**
   * Data limite para que a proposta de crédito seja aceita antes de expirar.
   * @type {Date}
   */
  expirationDate: {
    type: Date,
    required: [true, "O campo 'Data de expiração' é obrigatório."],
  },

  /**
   * Status de tramitação da oferta de crédito.
   * Valores permitidos: `"PENDING"` (Pendente), `"ACCEPTED"` (Aceita), `"REJECTED"` (Recusada), `"EXPIRED"` (Expirada).
   * @type {string}
   */
  status: {
    type: String,
    required: [true, "O campo 'Status' é obrigatório."],
    enum: {
      values: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED"],
      message: "O valor '{VALUE}' não é um status de oferta válido.",
    },
  },
});

/**
 * Modelo de dados do Mongoose para a coleção 'creditOffers'.
 * Interface para manipulação e persistência de ofertas de crédito no banco de dados.
 *
 * @type {mongoose.Model<ICreditOffer>}
 */
const creditOfferModel = mongoose.model("creditOffers", CreditOfferModel);

export default creditOfferModel;
