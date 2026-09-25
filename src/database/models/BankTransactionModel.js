import mongoose from "mongoose";

/**
 * Interface do documento de Transação Bancária.
 *
 * @typedef {Object} IBankTransaction
 * @property {mongoose.Types.ObjectId} company - ID da empresa proprietária ou relacionada à transação.
 * @property {mongoose.Types.ObjectId} bankAccount - ID da conta bancária onde a transação foi efetuada.
 * @property {Date} transactionDate - Data e hora de efetivação da transação bancária.
 * @property {"CREDIT"|"DEBIT"} operationType - Tipo da operação efetuada (Crédito ou Débito).
 * @property {number} amount - Valor financeiro movimentado na transação.
 * @property {string} description - Descrição ou histórico detalhado da transação.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Esquema do Mongoose para a coleção de Transações Bancárias (`bankTransactions`).
 * Define a estrutura dos documentos, validações de campos, tipos de operação e relacionamentos.
 */
const BankTransactionModel = new mongoose.Schema(
  {
    /**
     * Referência à empresa associada à transação bancária.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },

    /**
     * Referência à conta bancária onde a movimentação ocorreu.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link BankAccount} - Relacionamento com o model/coleção 'bankAccounts'.
     */
    bankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankAccounts",
      required: [true, "O campo 'Conta bancária' é obrigatório."],
    },

    /**
     * Data e hora do lançamento da transação no extrato bancário.
     * @type {Date}
     */
    transactionDate: {
      type: Date,
      required: [true, "O campo 'Data da transação' é obrigatório."],
    },

    /**
     * Tipo de operação bancária efetuada.
     * Valores permitidos: `"CREDIT"` (Entrada/Crédito), `"DEBIT"` (Saída/Débito).
     * @type {string}
     */
    operationType: {
      type: String,
      required: [true, "O campo 'Tipo de operação' é obrigatório."],
      enum: {
        values: ["CREDIT", "DEBIT"],
        message: "O valor '{VALUE}' não é um tipo de operação válido.",
      },
    },

    /**
     * Valor monetário envolvido no lançamento bancário.
     * @type {number}
     */
    amount: {
      type: Number,
      required: [true, "O campo 'Valor' é obrigatório."],
    },

    /**
     * Descrição ou histórico do extrato da transação bancária.
     * @type {string}
     */
    description: {
      type: String,
      required: [true, "O campo 'Descrição' é obrigatório."],
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
 * Modelo de dados do Mongoose para a coleção 'bankTransactions'.
 * Interface para manipulação e persistência de transações bancárias no banco de dados.
 *
 * @type {mongoose.Model<IBankTransaction>}
 */
const bankTransactionModel = mongoose.model(
  "bankTransactions",
  BankTransactionModel,
);

export default bankTransactionModel;
