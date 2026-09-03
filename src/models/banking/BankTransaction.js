import mongoose from "mongoose";

const BankTransactionModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    bankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankAccounts",
      required: [true, "O campo 'Conta bancária' é obrigatório."],
    },
    transactionDate: {
      type: Date,
      required: [true, "O campo 'Data da transação' é obrigatório."],
    },
    operationType: {
      type: String,
      required: [true, "O campo 'Tipo de operação' é obrigatório."],
      enum: {
        values: ["CREDIT", "DEBIT"],
        message: "O valor '{VALUE}' não é um tipo de operação válido.",
      },
    },
    amount: {
      type: Number,
      required: [true, "O campo 'Valor' é obrigatório."],
    },
    description: {
      type: String,
      required: [true, "O campo 'Descrição' é obrigatório."],
    },
  },
  { versionKey: false, timestamps: true },
);

const bankTransactionModel = mongoose.model(
  "bankTransactions",
  BankTransactionModel,
);

export default bankTransactionModel;
