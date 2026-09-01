import mongoose from "mongoose";
import AddressModel from "../shared/Address.js";

const CompanyModel = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    legalName: {
      type: String,
      required: [true, "Razão Social é um campo obrigatório."],
      unique: true,
    },
    tradeName: {
      type: String,
    },
    documentNumber: {
      type: String,
      required: [true, "CNPJ é um campo obrigatório."],
      unique: true,
    },
    cnaeCode: {
      type: String,
      required: [true, "CNAE é um campo obrigatório."],
    },
    address: {
      type: AddressModel,
      required: [true, "Endereço é um campo obrigatório."],
    },
    contactPhone: {
      type: Number,
      required: [true, "Telefone para contato é um campo obrigatório."],
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
