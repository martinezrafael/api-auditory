import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "Empresa é um campo obrigatório."],
    },
    acquirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cardAcquirers",
      required: [true, "Adquirente é um campo obrigatório."],
    },
    bankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankAccounts",
      default: null,
    },
    settlementDate: {
      type: Date,
      required: [true, "Data do repasse é um campo obrigatório."],
    },
    expectedDate: {
      type: Date,
      required: [true, "Data esperada do repasse é um campo obrigatório."],
    },
    settlementAmount: {
      type: Number,
      required: [true, "Valor do repasse é um campo obrigatório."],
    },
    status: {
      type: String,
      required: [true, "Status do repasse é um campo obrigatório."],
      trim: true,
      enum: {
        values: ["SCHEDULED", "PAID", "DISPUTED"],
        message:
          "Status do repasse inválido. Deve ser 'SCHEDULED', 'PAID' ou 'DISPUTED'.",
      },
    },
  },
  { versionKey: false, timestamps: true },
);

const settlementModel = mongoose.model("settlements", settlementSchema);

export default settlementModel;
