import mongoose from "mongoose";
import AddressModel from "./AddressModel.js";

const CompanyModel = new mongoose.Schema(
  {
    // LISTA DE USUÁRIOS VINCULADOS A EMPRESA QUE POSSUEM A ROLE "BUSINNES_OWNER"
    owners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "O campo 'Usuário' é obrigatório."],
      },
    ],
    // USUÁRIO RESPONSÁVEL PELA CRIAÇÃO/CADASTRO DA EMPRESA.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // RAZÃO SOCIAL DA EMPRESA
    legalName: {
      type: String,
      required: [true, "O campo 'Razão Social' é obrigatório."],
      unique: true,
    },
    // NOME FANTASIA DA EMPRESA
    tradeName: {
      type: String,
    },
    // NÚMERO DE CNPJ DA EMPRESA
    documentNumber: {
      type: String,
      required: [true, "O campo 'CNPJ' é obrigatório."],
      unique: true,
    },
    // CNAE DE ATIVIDADE DA EMPRESA
    cnaeCode: {
      type: String,
      required: [true, "O campo 'CNAE' é obrigatório."],
    },
    // ENDEREÇO DA EMPRESA
    address: {
      type: AddressModel,
      required: [true, "O campo 'Endereço' é obrigatório."],
    },
    // TELEFONE DE CONTATO DA EMPRESA
    contactPhone: {
      type: Number,
      required: [true, "O campo 'Telefone de contato' é obrigatório."],
    },
    // EMAIL DE CONTATO DA EMPRESA
    contactEmail: {
      type: String,
    },
    // SCORE DE CRÉDITO
    creditScore: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const companyModel = mongoose.model("companies", CompanyModel);

export default companyModel;
