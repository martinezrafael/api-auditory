import mongoose from "mongoose";

/**
 * Interface do documento de Transação de Cartão.
 *
 * @typedef {Object} ICardTransaction
 * @property {mongoose.Types.ObjectId} company - ID da empresa proprietária da transação.
 * @property {mongoose.Types.ObjectId} acquirer - ID da adquirente de cartão responsável pelo processamento.
 * @property {mongoose.Types.ObjectId|null} [settlement=null] - ID da liquidação/repassamento financeiro associado.
 * @property {Date} transactionDate - Data e hora de realização da transação.
 * @property {number} grossAmount - Valor bruto da transação de cartão.
 * @property {number} feePercentage - Percentual de taxa efetivamente cobrado pela adquirente.
 * @property {number} expectedFeePercentage - Percentual de taxa esperado conforme o contrato vigente.
 * @property {number} netAmount - Valor líquido efetivamente cobrado/creditado.
 * @property {number} expectedNetAmount - Valor líquido esperado com base na taxa contratual.
 * @property {"CREDIT"|"DEBIT"|"VOUCHER"} paymentMethod - Método/Modalidade de pagamento utilizado.
 * @property {number} [installments=1] - Número de parcelas da transação.
 * @property {string} authorizationCode - Código de autorização emitido pela adquirente/bandeira.
 * @property {"AUTHORIZED"|"CAPTURED"|"CANCELED"|"CHARGEBACK"} status - Status operacional da transação de cartão.
 * @property {"PENDING"|"APPROVED"|"DIVERGENT_FEE"|"MISSING_SETTLEMENT"|"MISSING_BANK_DEPOSIT"} [auditStatus="PENDING"] - Status da auditoria/conciliação financeira.
 * @property {number} [discrepancyAmount=0] - Valor financeiro da divergência identificada na auditoria.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Esquema do Mongoose para a coleção de Transações de Cartão (`cardTransactions`).
 * Define a estrutura dos documentos, validações de campos, relacionamentos e enums de auditoria e pagamento.
 */
const CardTransactionModel = new mongoose.Schema(
  {
    /**
     * Referência à empresa titular da transação.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },

    /**
     * Referência à adquirente de cartão responsável pelo processamento da venda.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link CardAcquirer} - Relacionamento com o model/coleção 'cardAcquirers'.
     */
    acquirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cardAcquirers",
      required: [true, "O campo 'Adquirente' é obrigatório."],
    },

    /**
     * Referência ao lote de liquidação/repassamento financeiro associado (opcional).
     * @type {mongoose.Schema.Types.ObjectId|null}
     * @see {@link Settlement} - Relacionamento com o model/coleção 'settlements'.
     * @default null
     */
    settlement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "settlements",
      default: null,
    },

    /**
     * Data e hora de realização da transação de cartão.
     * @type {Date}
     */
    transactionDate: {
      type: Date,
      required: [true, "O campo 'Data da transação' é obrigatório."],
    },

    /**
     * Valor total bruto da transação efetuada.
     * @type {number}
     */
    grossAmount: {
      type: Number,
      required: [true, "O campo 'Valor bruto' é obrigatório."],
    },

    /**
     * Percentual de taxa aplicado pela adquirente sobre a transação.
     * @type {number}
     */
    feePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa cobrada (%)' é obrigatório."],
    },

    /**
     * Percentual de taxa previsto em contrato para o método e parcelamento da transação.
     * @type {number}
     */
    expectedFeePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa contratual esperada (%)' é obrigatório."],
    },

    /**
     * Valor líquido cobrado/recebido após aplicação da taxa efetiva da adquirente.
     * @type {number}
     */
    netAmount: {
      type: Number,
      required: [true, "O campo 'Valor líquido cobrado' é obrigatório."],
    },

    /**
     * Valor líquido esperado após aplicação da taxa contratual cadastrada.
     * @type {number}
     */
    expectedNetAmount: {
      type: Number,
      required: [true, "O campo 'Valor líquido esperado' é obrigatório."],
    },

    /**
     * Método de pagamento utilizado na transação.
     * Valores permitidos: `"CREDIT"`, `"DEBIT"`, `"VOUCHER"`.
     * @type {string}
     */
    paymentMethod: {
      type: String,
      required: [true, "O campo 'Método de pagamento' é obrigatório."],
      trim: true,
      enum: {
        values: ["CREDIT", "DEBIT", "VOUCHER"],
        message: "O valor '{VALUE}' não é um método de pagamento válido.",
      },
    },

    /**
     * Quantidade de parcelas da transação.
     * @type {number}
     * @default 1
     */
    installments: {
      type: Number,
      required: [true, "O campo 'Número de parcelas' é obrigatório."],
      default: 1,
    },

    /**
     * Código de autorização retornado pela adquirente no momento da captura da transação.
     * @type {string}
     */
    authorizationCode: {
      type: String,
      required: [true, "O campo 'Código de autorização' é obrigatório."],
      trim: true,
    },

    /**
     * Status operacional do ciclo de vida da transação na adquirente.
     * Valores permitidos: `"AUTHORIZED"`, `"CAPTURED"`, `"CANCELED"`, `"CHARGEBACK"`.
     * @type {string}
     */
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      trim: true,
      enum: {
        values: ["AUTHORIZED", "CAPTURED", "CANCELED", "CHARGEBACK"],
        message: "O valor '{VALUE}' não é um status de transação válido.",
      },
    },

    /**
     * Status do resultado do processo de auditoria e conciliação financeira.
     * Valores permitidos: `"PENDING"`, `"APPROVED"`, `"DIVERGENT_FEE"`, `"MISSING_SETTLEMENT"`, `"MISSING_BANK_DEPOSIT"`.
     * @type {string}
     * @default "PENDING"
     */
    auditStatus: {
      type: String,
      required: [true, "O campo 'Status da auditoria' é obrigatório."],
      enum: {
        values: [
          "PENDING",
          "APPROVED",
          "DIVERGENT_FEE",
          "MISSING_SETTLEMENT",
          "MISSING_BANK_DEPOSIT",
        ],
        message: "O valor '{VALUE}' não é um status de auditoria válido.",
      },
      default: "PENDING",
    },

    /**
     * Valor monetário da divergência financeira encontrada entre a cobrança esperada e a cobrada.
     * @type {number}
     * @default 0
     */
    discrepancyAmount: {
      type: Number,
      default: 0,
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
 * Modelo de dados do Mongoose para a coleção 'cardTransactions'.
 * Interface para manipulação e persistência de transações de cartão no banco de dados.
 *
 * @type {mongoose.Model<ICardTransaction>}
 */
const cardTransactionModel = mongoose.model(
  "cardTransactions",
  CardTransactionModel,
);

export default cardTransactionModel;
