import mongoose from "mongoose";

const BankAccountModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "banks",
      required: [true, "O campo 'Instituição bancária' é obrigatório."],
    },
    agencyNumber: {
      type: String,
      required: [true, "O campo 'Número da agência' é obrigatório."],
      trim: true,
    },
    accountNumber: {
      type: String,
      required: [true, "O campo 'Número da conta' é obrigatório."],
      trim: true,
    },
    accountType: {
      type: String,
      required: [true, "O campo 'Tipo de conta' é obrigatório."],
      enum: {
        values: ["CHECKING", "SAVINGS"],
        message: "O valor '{VALUE}' não é um tipo de conta válido.",
      },
    },
  },
  { versionKey: false, timestamps: true },
);

const bankAccountModel = mongoose.model("bankAccounts", BankAccountModel);

export default bankAccountModel;
