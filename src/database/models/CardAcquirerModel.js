import mongoose from "mongoose";

/**
 * Interface do documento de Adquirente de Cartão.
 *
 * @typedef {Object} ICardAcquirer
 * @property {string} acquirerName - Nome comercial da credenciadora/adquirente (ex: "Cielo", "Stone", "Rede").
 * @property {string} documentNumber - Número do CNPJ da adquirente (único).
 * @property {boolean} [isActive=true] - Status de atividade da adquirente no sistema.
 * @property {boolean} [isDeleted=false] - Indica se o registro sofreu exclusão lógica (Soft Delete).
 * @property {Date|null} [deletedAt=null] - Timestamp do momento da realização do Soft Delete.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Esquema do Mongoose para a coleção de Adquirentes de Cartão (`cardAcquirers`).
 * Define a estrutura dos documentos, validações de campos e regras de Soft Delete.
 */
const CardAcquirerModel = new mongoose.Schema(
  {
    /**
     * Nome comercial da credenciadora (ex: "Cielo", "Stone", "Rede").
     * @type {string}
     */
    acquirerName: {
      type: String,
      required: [true, "O campo 'Nome do adquirente' é obrigatório."],
      trim: true,
    },

    /**
     * CNPJ da adquirente (campo único no sistema).
     * @type {string}
     */
    documentNumber: {
      type: String,
      required: [true, "O campo 'CNPJ' é obrigatório."],
      trim: true,
      unique: true,
    },

    /**
     * Status de ativação da adquirente no sistema.
     * @type {boolean}
     * @default true
     */
    isActive: {
      type: Boolean,
      default: true,
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
     * Timestamp do momento da realização do Soft Delete.
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
 * Modelo de dados do Mongoose para a coleção 'cardAcquirers'.
 * Interface para realização de operações de banco de dados da entidade Adquirente de Cartão.
 *
 * @type {mongoose.Model<ICardAcquirer>}
 */
const cardAcquirerModel = mongoose.model("cardAcquirers", CardAcquirerModel);

export default cardAcquirerModel;
