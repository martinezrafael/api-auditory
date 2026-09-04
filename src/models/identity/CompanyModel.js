import mongoose from "mongoose";
import AddressModel from "../shared/AddressModel.js";

const CompanyModel = new mongoose.Schema(
  {
    legalName: {
      type: String,
      required: [true, "O campo 'Razão Social' é obrigatório."],
      unique: true,
    },
    tradeName: {
      type: String,
    },
    documentNumber: {
      type: String,
      required: [true, "O campo 'CNPJ' é obrigatório."],
      unique: true,
    },
    cnaeCode: {
      type: String,
      required: [true, "O campo 'CNAE' é obrigatório."],
    },
    address: {
      type: AddressModel,
      required: [true, "O campo 'Endereço' é obrigatório."],
    },
    contactPhone: {
      type: Number,
      required: [true, "O campo 'Telefone de contato' é obrigatório."],
    },
    contactEmail: {
      type: String,
    },
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
