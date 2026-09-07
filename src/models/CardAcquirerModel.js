import mongoose from "mongoose";

const CardAcquirerModel = new mongoose.Schema({
  // EMPRESA VINCULADA AO CARTÃO
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: [true, "O campo 'Empresa' é obrigatório."],
  },
  // NOME DA ADQUIRENTE
  acquirerName: {
    type: String,
    required: [true, "O campo 'Nome do adquirente' é obrigatório."],
    trim: true,
  },
  // CNPJ DA ADQUIRENTE
  documentNumber: {
    type: String,
    required: [true, "O campo 'CNPJ' é obrigatório."],
    trim: true,
  },
  // ID UTILIZADO PELA ADQUIRENTE PARA IDENTIFICAR O CLIENTE NA BASE DELA
  merchantId: {
    type: String,
    required: [true, "O campo 'ID do comerciante' é obrigatório."],
    trim: true,
  },
});

const cardAcquirerModel = mongoose.model("cardAcquirers", CardAcquirerModel);

export default cardAcquirerModel;
