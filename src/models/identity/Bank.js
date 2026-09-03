import mongoose from "mongoose";

const BankModel = new mongoose.Schema(
  {
    bankCode: {
      type: String,
      required: [true, "Código do banco é um campo obrigatório."],
    },
    legalName: {
      type: String,
      required: [true, "Razão Social é um campo obrigatório."],
    },
    documentNumber: {
      type: String,
      required: [true, "CNPJ é um campo obrigatório."],
    },
    customerServicePhone: {
      type: String,
      required: [true, "Telefone para contato é um campo obrigatório."],
    },
  },
  { versionKey: false, timestamps: true },
);

const bankModel = mongoose.model("banks", BankModel);

export default bankModel;
