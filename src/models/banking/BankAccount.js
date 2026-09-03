import mongoose from "mongoose";

const BankAccountModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "Empresa é um campo obrigatório."],
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "banks",
      required: [true, "Instituição bancária é um campo obrigatório."],
    },
    agencyNumber: {
      type: String,
      required: [true, "Número da agência é um campo obrigatório."],
      trim: true,
    },
    accountNumber: {
      type: String,
      required: [true, "Número da conta é um campo obrigatório."],
      trim: true,
    },
    accountType: {
      type: String,
      enum: ["CHECKING", "SAVINGS"],
      required: [true, "Tipo de conta é um campo obrigatório."],
    },
  },
  { versionKey: false, timestamps: true },
);

const bankAccountModel = mongoose.model("bankAccounts", BankAccountModel);

export default bankAccountModel;
