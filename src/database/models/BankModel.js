import mongoose from "mongoose";

/**
 * Esquema do Mongoose para a coleção de Bancos (`banks`).
 * Define a estrutura dos documentos, validações de campos e propriedades.
 *
 * @typedef {Object} IBank
 * @property {string} bankCode - Código COMPE/ISPB de identificação do banco (ex: "001", "237").
 * @property {string} legalName - Razão social ou nome oficial da instituição bancária.
 * @property {string} documentNumber - Número do CNPJ do banco.
 * @property {string} customerServicePhone - Telefone da central de atendimento / SAC.
 * @property {boolean} [isDeleted=false] - Indica se o registro foi excluído logicamente (Soft Delete).
 * @property {Date|null} [deletedAt=null] - Data e hora em que a exclusão lógica foi realizada.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */
const BankModel = new mongoose.Schema(
  {
    /**
     * Código de identificação do banco.
     * @type {string}
     */
    bankCode: {
      type: String,
      required: [true, "O campo 'Código do banco' é obrigatório."],
    },

    /**
     * Razão Social da instituição financeira.
     * @type {string}
     */
    legalName: {
      type: String,
      required: [true, "O campo 'Razão Social' é obrigatório."],
    },

    /**
     * CNPJ do banco.
     * @type {string}
     */
    documentNumber: {
      type: String,
      required: [true, "O campo 'CNPJ' é obrigatório."],
    },

    /**
     * Telefone do serviço de atendimento ao cliente (SAC).
     * @type {string}
     */
    customerServicePhone: {
      type: String,
      required: [true, "O campo 'Telefone de atendimento' é obrigatório."],
    },

    /**
     * Flag indicadora de exclusão lógica (Soft Delete).
     * Omitido por padrão das consultas (`select: false`).
     * @type {boolean}
     * @default false
     */
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
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
 * Modelo de dados do Mongoose para a coleção 'banks'.
 * Interface para realização de operações de banco de dados da entidade Banco.
 *
 * @type {mongoose.Model<IBank>}
 */
const bankModel = mongoose.model("banks", BankModel);

export default bankModel;
