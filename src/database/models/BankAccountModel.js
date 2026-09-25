import mongoose from "mongoose";

/**
 * Interface do documento de Conta Bancária.
 *
 * @typedef {Object} IBankAccount
 * @property {mongoose.Types.ObjectId} company - ID da empresa proprietária da conta bancária.
 * @property {mongoose.Types.ObjectId} bank - ID da instituição bancária relacionada.
 * @property {string} agencyNumber - Número da agência bancária (com ou sem dígito verificador).
 * @property {string} accountNumber - Número da conta corrente ou poupança (com dígito verificador).
 * @property {"CHECKING"|"SAVINGS"} accountType - Tipo da conta bancária (Corrente ou Poupança).
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Esquema do Mongoose para a coleção de Contas Bancárias (`bankAccounts`).
 * Define a estrutura dos documentos, relacionamentos com empresas e bancos, e validações de campos.
 */
const BankAccountModel = new mongoose.Schema(
  {
    /**
     * Referência à empresa titular da conta bancária.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },

    /**
     * Referência à instituição bancária associada.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Bank} - Relacionamento com o model/coleção 'banks'.
     */
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "banks",
      required: [true, "O campo 'Instituição bancária' é obrigatório."],
    },

    /**
     * Número da agência bancária.
     * @type {string}
     */
    agencyNumber: {
      type: String,
      required: [true, "O campo 'Número da agência' é obrigatório."],
      trim: true,
    },

    /**
     * Número da conta bancária com dígito verificador.
     * @type {string}
     */
    accountNumber: {
      type: String,
      required: [true, "O campo 'Número da conta' é obrigatório."],
      trim: true,
    },

    /**
     * Tipo de conta bancária.
     * Valores permitidos: `"CHECKING"` (Conta Corrente), `"SAVINGS"` (Conta Poupança).
     * @type {string}
     */
    accountType: {
      type: String,
      required: [true, "O campo 'Tipo de conta' é obrigatório."],
      enum: {
        values: ["CHECKING", "SAVINGS"],
        message: "O valor '{VALUE}' não é um tipo de conta válido.",
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
 * Modelo de dados do Mongoose para a coleção 'bankAccounts'.
 * Interface para realização de operações de banco de dados da entidade Conta Bancária.
 *
 * @type {mongoose.Model<IBankAccount>}
 */
const bankAccountModel = mongoose.model("bankAccounts", BankAccountModel);

export default bankAccountModel;
