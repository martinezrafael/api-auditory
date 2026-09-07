import mongoose from "mongoose";

const BankAccountModel = new mongoose.Schema(
  {
    // EMPRESA VINCULADA A CONTA
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    // INSTITUIÇÃO BANCÁRIA VINCULADA A CONTA
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "banks",
      required: [true, "O campo 'Instituição bancária' é obrigatório."],
    },
    // NÚMERO DA AGÊNCIA
    agencyNumber: {
      type: String,
      required: [true, "O campo 'Número da agência' é obrigatório."],
      trim: true,
    },
    // NÚMERO DA CONTA
    accountNumber: {
      type: String,
      required: [true, "O campo 'Número da conta' é obrigatório."],
      trim: true,
    },
    // TIPO DA CONTA (CORRENTE OU POUPANÇA)
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
