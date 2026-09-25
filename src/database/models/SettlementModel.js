import mongoose from "mongoose";

/**
 * Interface do documento de Liquidação Financeira / Repasse.
 *
 * @typedef {Object} ISettlement
 * @property {mongoose.Types.ObjectId} company - ID da empresa beneficiária do repasse.
 * @property {mongoose.Types.ObjectId} acquirer - ID da credenciadora/adquirente de cartão responsável pelo repasse.
 * @property {mongoose.Types.ObjectId} bankAccount - ID da conta bancária de destino do repasse.
 * @property {mongoose.Types.ObjectId|null} [bankTransaction=null] - ID da transação bancária associada ao repasse (opcional).
 * @property {Date} settlementDate - Data efetiva de realização do repasse.
 * @property {Date} expectedDate - Data prevista para o recebimento do repasse.
 * @property {number} settlementAmount - Valor efetivamente repassado.
 * @property {number} expectedAmount - Valor que estava previsto para ser repassado.
 * @property {number} [discrepancyAmount=0] - Valor da divergência/diferença entre o esperado e o repassado.
 * @property {"SCHEDULED"|"PAID"|"DISPUTED"|"DIVERGENT"} status - Estado atual da liquidação financeira.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Esquema do Mongoose para a coleção de Liquidações Financeiras (`settlements`).
 * Define a estrutura dos documentos, validações de valores, conciliação e relacionamentos de repasses.
 */
const SettlementModel = new mongoose.Schema(
  {
    /**
     * Referência à empresa destinatária do repasse.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },

    /**
     * Referência à credenciadora/adquirente que processou e realizou o repasse.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link CardAcquirer} - Relacionamento com o model/coleção 'cardAcquirers'.
     */
    acquirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cardAcquirers",
      required: [true, "O campo 'Adquirente' é obrigatório."],
    },

    /**
     * Referência à conta bancária vinculada para crédito dos valores.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link BankAccount} - Relacionamento com o model/coleção 'bankAccounts'.
     */
    bankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankAccounts",
      required: [true, "O campo 'Conta bancária' é obrigatório."],
    },

    /**
     * Referência à transação bancária vinculada para conciliação (se houver).
     * @type {mongoose.Schema.Types.ObjectId|null}
     * @see {@link BankTransaction} - Relacionamento com o model/coleção 'bankTransactions'.
     * @default null
     */
    bankTransaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankTransactions",
      default: null,
    },

    /**
     * Data em que o repasse foi efetivamente liquidado.
     * @type {Date}
     */
    settlementDate: {
      type: Date,
      required: [true, "O campo 'Data do repasse' é obrigatório."],
    },

    /**
     * Data em que a liquidação estava prevista segundo as regras do contrato/adquirente.
     * @type {Date}
     */
    expectedDate: {
      type: Date,
      required: [true, "O campo 'Data prevista' é obrigatório."],
    },

    /**
     * Valor monetário líquido que foi repassado.
     * @type {number}
     */
    settlementAmount: {
      type: Number,
      required: [true, "O campo 'Valor do repasse' é obrigatório."],
    },

    /**
     * Valor monetário previsto contratualmente antes da conciliação.
     * @type {number}
     */
    expectedAmount: {
      type: Number,
      required: [true, "O campo 'Valor esperado' é obrigatório."],
    },

    /**
     * Diferença apurada entre o valor esperado e o valor líquido repassado.
     * @type {number}
     * @default 0
     */
    discrepancyAmount: {
      type: Number,
      default: 0,
    },

    /**
     * Status de acompanhamento da liquidação do repasse.
     * Valores permitidos:
     * - `"SCHEDULED"`: Agendado para pagamento futuro.
     * - `"PAID"`: Liquidado/Pago com sucesso.
     * - `"DISPUTED"`: Em contestação ou chargeback.
     * - `"DIVERGENT"`: Divergência encontrada no valor ou data.
     *
     * @type {string}
     */
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      trim: true,
      enum: {
        values: ["SCHEDULED", "PAID", "DISPUTED", "DIVERGENT"],
        message: "O valor '{VALUE}' não é um status de repasse válido.",
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
 * Modelo de dados do Mongoose para a coleção 'settlements'.
 * Interface para manipulação e persistência de liquidações financeiras e repasses no banco de dados.
 *
 * @type {mongoose.Model<ISettlement>}
 */
const settlementModel = mongoose.model("settlements", SettlementModel);

export default settlementModel;
