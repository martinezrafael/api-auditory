import mongoose from "mongoose";

/**
 * Interface do documento de Solicitação de Crédito.
 *
 * @typedef {Object} ICreditRequest
 * @property {mongoose.Types.ObjectId} company - ID da empresa solicitante do crédito.
 * @property {mongoose.Types.ObjectId} [requestedBy] - ID do usuário responsável pela criação do pedido (opcional).
 * @property {Date} requestDate - Data e hora de abertura da solicitação.
 * @property {number} requestedAmount - Montante financeiro total solicitado.
 * @property {number} requiredScore - Pontuação de crédito/score mínimo exigido para aprovação.
 * @property {number} installmentsLimit - Número máximo de parcelas desejado para o parcelamento.
 * @property {"MISSING_DOCS"|"UNDER_REVIEW"|"OFFERS_AVAILABLE"|"APPROVED"|"RELEASED"|"DENIED"|"CANCELED"} status - Status atual do fluxo de análise do crédito.
 */

/**
 * Esquema do Mongoose para a coleção de Solicitações de Crédito (`creditRequests`).
 * Define a estrutura dos documentos, validações de campos, relacionamentos e o enum do ciclo de vida do pedido.
 */
const CreditRequestModel = new mongoose.Schema(
  {
    /**
     * Referência à empresa solicitante.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },

    /**
     * Referência ao usuário que realizou a solicitação de crédito.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link User} - Relacionamento com o model/coleção 'users'.
     */
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    /**
     * Data em que a solicitação de crédito foi enviada.
     * @type {Date}
     */
    requestDate: {
      type: Date,
      required: [true, "O campo 'Data da solicitação' é obrigatório."],
    },

    /**
     * Valor monetário pretendido para a operação de crédito.
     * @type {number}
     */
    requestedAmount: {
      type: Number,
      required: [true, "O campo 'Valor solicitado' é obrigatório."],
    },

    /**
     * Pontuação de score calculada/necessária para avaliação da mesa de crédito.
     * @type {number}
     */
    requiredScore: {
      type: Number,
      required: [true, "O campo 'Pontuação necessária' é obrigatório."],
    },

    /**
     * Limite/quantidade máxima de parcelas acordada ou solicitada.
     * @type {number}
     */
    installmentsLimit: {
      type: Number,
      required: [true, "O campo 'Limite de parcelas' é obrigatório."],
    },

    /**
     * Status do ciclo de vida do pedido de crédito.
     * Valores permitidos:
     * - `"MISSING_DOCS"`: Documentação pendente.
     * - `"UNDER_REVIEW"`: Em análise de crédito.
     * - `"OFFERS_AVAILABLE"`: Propostas disponíveis para escolha.
     * - `"APPROVED"`: Crédito aprovado.
     * - `"RELEASED"`: Valor liberado/pago.
     * - `"DENIED"`: Solicitação recusada.
     * - `"CANCELED"`: Cancelada pelo solicitante ou sistema.
     *
     * @type {string}
     */
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      enum: {
        values: [
          "MISSING_DOCS",
          "UNDER_REVIEW",
          "OFFERS_AVAILABLE",
          "APPROVED",
          "RELEASED",
          "DENIED",
          "CANCELED",
        ],
        message: "O valor '{VALUE}' não é um status de solicitação válido.",
      },
    },

    /**
     * Flag indicadora de exclusão lógica (Soft Delete).
     * @type {boolean}
     * @default false
     */
    isDeleted: {
      type: Boolean,
      default: false,
    },

    /**
     * Timestamp da realização do Soft Delete.
     * @type {Date|null}
     * @default null
     */
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    /** Desabilita o campo de versionamento do Mongoose (`__v`). */
    versionKey: false,
    /** Adiciona automaticamente os campos `createdAt` e `updatedAt`. */
    timestamps: true,
  },
);

/**
 * Modelo de dados do Mongoose para a coleção 'creditRequests'.
 * Interface para manipulação e persistência de solicitações de crédito no banco de dados.
 *
 * @type {mongoose.Model<ICreditRequest>}
 */
const creditRequestModel = mongoose.model("creditRequests", CreditRequestModel);

export default creditRequestModel;
