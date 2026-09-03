import mongoose from "mongoose";

const BankTransactionModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "Empresa é um campo obrigatório."],
    },
    bankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankAccounts",
      required: [true, "Conta bancária é um campo obrigatório."],
    },
    transactionDate: {
      type: Date,
      required: [true, "Data da transação é um campo obrigatório."],
    },
    operationType: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: [true, "Tipo de operação é um campo obrigatório."],
    },
    amount: {
      type: Number,
      required: [true, "Valor da transação é um campo obrigatório."],
    },
    description: {
      type: String,
      required: [true, "Descrição da transação é um campo obrigatório."],
    },
  },
  { versionKey: false, timestamps: true },
);

const bankTransactionModel = mongoose.model(
  "bankTransactions",
  BankTransactionModel,
);

export default bankTransactionModel;
