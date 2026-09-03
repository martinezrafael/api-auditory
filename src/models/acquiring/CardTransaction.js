import mongoose from "mongoose";

const cardTransactionSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: [true, "O campo 'Empresa' é obrigatório."],
  },
  acquirer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cardAcquirers",
    required: [true, "O campo 'Adquirente' é obrigatório."],
  },
  settlement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "settlements",
    default: null,
  },
  transactionDate: {
    type: Date,
    required: [true, "O campo 'Data da transação' é obrigatório."],
  },
  grossAmount: {
    type: Number,
    required: [true, "O campo 'Valor bruto' é obrigatório."],
  },
  netAmount: {
    type: Number,
    required: [true, "O campo 'Valor líquido' é obrigatório."],
  },
  feePercentage: {
    type: Number,
    required: [true, "O campo 'Percentual de taxa' é obrigatório."],
  },
  paymentMethod: {
    type: String,
    required: [true, "O campo 'Método de pagamento' é obrigatório."],
    trim: true,
    enum: {
      values: ["CREDIT", "DEBIT", "VOUCHER"],
      message: "O valor '{VALUE}' não é um método de pagamento válido.",
    },
  },
  installments: {
    type: Number,
    required: [true, "O campo 'Número de parcelas' é obrigatório."],
  },
  authorizationCode: {
    type: String,
    required: [true, "O campo 'Código de autorização' é obrigatório."],
    trim: true,
  },
  status: {
    type: String,
    required: [true, "O campo 'Status' é obrigatório."],
    trim: true,
    enum: {
      values: ["AUTHORIZED", "CAPTURED", "CANCELED", "CHARGEBACK"],
      message: "O valor '{VALUE}' não é um status de transação válido.",
    },
  },
});

const cardTransactionModel = mongoose.model(
  "cardTransactions",
  cardTransactionSchema,
);

export default cardTransactionModel;
