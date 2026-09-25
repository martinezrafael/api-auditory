import mongoose from "mongoose";

/**
 * Interface do subdocumento de Regra de Taxa.
 *
 * @typedef {Object} IFeeRule
 * @property {mongoose.Types.ObjectId} [_id] - Identificador único da regra de taxa.
 * @property {"CREDIT"|"DEBIT"|"VOUCHER"} paymentMethod - Método de pagamento associado à taxa.
 * @property {number} [minInstallments=1] - Quantidade mínima de parcelas para a regra.
 * @property {number} [maxInstallments=1] - Quantidade máxima de parcelas para a regra.
 * @property {number} agreedFeePercentage - Percentual da taxa acordada em contrato.
 */

/**
 * Subdocumento com a regra de taxa para uma faixa específica de parcelas.
 *
 * @type {mongoose.Schema<IFeeRule>}
 */
const FeeRuleSchema = new mongoose.Schema(
  {
    /**
     * Método de pagamento aplicável ("CREDIT", "DEBIT", "VOUCHER").
     * @type {string}
     */
    paymentMethod: {
      type: String,
      required: [true, "O campo 'Método de pagamento' é obrigatório."],
      enum: {
        values: ["CREDIT", "DEBIT", "VOUCHER"],
        message: "O valor '{VALUE}' não é um método de pagamento válido.",
      },
    },

    /**
     * Quantidade mínima de parcelas da faixa.
     * @type {number}
     * @default 1
     */
    minInstallments: {
      type: Number,
      default: 1,
      min: [1, "O mínimo de parcelas deve ser no mínimo 1."],
    },

    /**
     * Quantidade máxima de parcelas da faixa.
     * @type {number}
     * @default 1
     */
    maxInstallments: {
      type: Number,
      default: 1,
      min: [1, "O máximo de parcelas deve ser no mínimo 1."],
    },

    /**
     * Taxa percentual contratada para o arranjo de pagamento e faixa de parcelas.
     * @type {number}
     */
    agreedFeePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa contratual (%)' é obrigatório."],
      min: [0, "A taxa percentual não pode ser negativa."],
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
  { _id: true },
);

/**
 * Interface do documento principal de Contrato de Taxas.
 *
 * @typedef {Object} IContractFee
 * @property {mongoose.Types.ObjectId} company - ID da empresa proprietária do contrato.
 * @property {mongoose.Types.ObjectId} acquirer - ID da adquirente/credenciadora vinculada.
 * @property {string} merchantId - ID do estabelecimento/comerciante (Merchant ID/EC).
 * @property {IFeeRule[]} [fees=[]] - Lista de regras de taxas configuradas no contrato.
 * @property {boolean} [isActive=true] - Status de atividade do contrato.
 * @property {boolean} [isDeleted=false] - Indica se o contrato sofreu exclusão lógica (Soft Delete).
 * @property {Date|null} [deletedAt=null] - Timestamp da exclusão lógica.
 * @property {Date} createdAt - Data de criação do registro (automático).
 * @property {Date} updatedAt - Data de atualização do registro (automático).
 */

/**
 * Esquema do Mongoose para o Contrato de Taxas (Credenciamento na Adquirente).
 * Define as taxas contratadas por empresa, adquirente e Merchant ID.
 */
const ContractFeeModel = new mongoose.Schema(
  {
    /**
     * Referência à empresa contratante.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },

    /**
     * Referência à credenciadora/adquirente.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link CardAcquirer} - Relacionamento com o model/coleção 'cardAcquirers'.
     */
    acquirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cardAcquirers",
      required: [true, "O campo 'Adquirente' é obrigatório."],
    },

    /**
     * Identificador do comerciante na adquirente (EC / Merchant ID).
     * @type {string}
     */
    merchantId: {
      type: String,
      required: [
        true,
        "O campo 'ID do comerciante (Merchant ID)' é obrigatório.",
      ],
      trim: true,
    },

    /**
     * Array contendo as faixas e regras de taxas atreladas ao contrato.
     * @type {IFeeRule[]}
     * @default []
     */
    fees: {
      type: [FeeRuleSchema],
      default: [],
    },

    /**
     * Status de ativação do contrato no sistema.
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

// Índice composto para evitar múltiplos contratos duplicados para o mesmo Merchant ID na mesma adquirente
ContractFeeModel.index(
  { company: 1, acquirer: 1, merchantId: 1 },
  { unique: true },
);

/**
 * Modelo de dados do Mongoose para a coleção 'contractFees'.
 * Interface para manipulação de contratos e taxas de adquirentes no banco de dados.
 *
 * @type {mongoose.Model<IContractFee>}
 */
const contractFeeModel = mongoose.model("contractFees", ContractFeeModel);

export default contractFeeModel;
