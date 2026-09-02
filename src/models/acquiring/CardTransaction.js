import mongoose from "mongoose";

const cardTransactionSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  transactionDate: {
    type: Date,
    required: [true, "Data da transação é um campo obrigatório."],
  },
  grossAmount: {
    type: Number,
    required: [true, "Valor bruto da transação é um campo obrigatório."],
  },
  netAmount: {
    type: Number,
    required: [true, "Valor líquido a receber é um campo obrigatório."],
  },
  feePercentage: {
    type: Number,
    required: [true, "Percentual de taxa é um campo obrigatório."],
  },
  paymentMethod: {
    type: String,
    required: [true, "Método de pagamento é um campo obrigatório."],
    trim: true,
    enum: {
      values: ["CREDIT", "DEBIT", "VOUCHER"],
      message:
        "Método de pagamento inválido. Deve ser 'CREDIT', 'DEBIT' ou 'VOUCHER'.",
    },
  },
  installments: {
    type: Number,
    required: [true, "Número de parcelas é um campo obrigatório."],
  },
  authorizationCode: {
    type: String,
    required: [true, "Código de autorização é um campo obrigatório."],
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Status da transação é um campo obrigatório."],
    trim: true,
    enum: {
      values: ["AUTHORIZED", "CAPTURED", "CANCELED", "CHARGEBACK"],
      message:
        "Status da transação inválido. Deve ser 'AUTHORIZED', 'CAPTURED', 'CANCELED' ou 'CHARGEBACK'.",
    },
  },
});

const cardTransactionModel = mongoose.model(
  "cardTransactions",
  cardTransactionSchema,
);

export default cardTransactionModel;
