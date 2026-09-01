import mongoose from "mongoose";

const CardAcquirerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  acquirerName: {
    type: String,
    required: [true, "Nome do adquirente é um campo obrigatório."],
    trim: true,
  },
  documentNumber: {
    type: String,
    required: [true, "CNPJ é um campo obrigatório."],
    trim: true,
  },
  merchantId: {
    type: String,
    required: [true, "ID do comerciante é um campo obrigatório."],
    trim: true,
  },
});

const cardAcquirerModel = mongoose.model("cardAcquirers", CardAcquirerSchema);

export default cardAcquirerModel;
