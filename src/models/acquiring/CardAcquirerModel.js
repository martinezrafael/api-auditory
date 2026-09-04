import mongoose from "mongoose";

const CardAcquirerModel = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: [true, "O campo 'Empresa' é obrigatório."],
  },
  acquirerName: {
    type: String,
    required: [true, "O campo 'Nome do adquirente' é obrigatório."],
    trim: true,
  },
  documentNumber: {
    type: String,
    required: [true, "O campo 'CNPJ' é obrigatório."],
    trim: true,
  },
  merchantId: {
    type: String,
    required: [true, "O campo 'ID do comerciante' é obrigatório."],
    trim: true,
  },
});

const cardAcquirerModel = mongoose.model("cardAcquirers", CardAcquirerModel);

export default cardAcquirerModel;
