import mongoose from "mongoose";

const SettlementModel = new mongoose.Schema(
  {
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
    bankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankAccounts",
      required: [true, "O campo 'Conta bancária' é obrigatório."],
    },
    bankTransaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankTransactions",
      default: null,
    },
    settlementDate: {
      type: Date,
      required: [true, "O campo 'Data do repasse' é obrigatório."],
    },
    expectedDate: {
      type: Date,
      required: [true, "O campo 'Data prevista' é obrigatório."],
    },
    settlementAmount: {
      type: Number,
      required: [true, "O campo 'Valor do repasse' é obrigatório."],
    },
    expectedAmount: {
      type: Number,
      required: [true, "O campo 'Valor esperado' é obrigatório."],
    },
    discrepancyAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      trim: true,
      enum: {
        values: ["SCHEDULED", "PAID", "DISPUTED", "DIVERGENT"],
        message: "O valor '{VALUE}' não é um status de repasse válido.",
      },
    },
  },
  { versionKey: false, timestamps: true },
);

const settlementModel = mongoose.model("settlements", SettlementModel);

export default settlementModel;
