import mongoose from "mongoose";

// É POSSÍVEL PREENCHER OS DADOS DE RAZÃO SOCIAL E CÓDIGO DO BANCO FAZENDO UMA REQUISIÇÃO PARA A API DO BANCO CENTRAL?

const BankModel = new mongoose.Schema(
  {
    bankCode: {
      type: String,
      required: [true, "O campo 'Código do banco' é obrigatório."],
    },
    legalName: {
      type: String,
      required: [true, "O campo 'Razão Social' é obrigatório."],
    },
    documentNumber: {
      type: String,
      required: [true, "O campo 'CNPJ' é obrigatório."],
    },
    customerServicePhone: {
      type: String,
      required: [true, "O campo 'Telefone de atendimento' é obrigatório."],
    },
  },
  { versionKey: false, timestamps: true },
);

const bankModel = mongoose.model("banks", BankModel);

export default bankModel;
