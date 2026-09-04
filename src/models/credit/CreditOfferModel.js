import mongoose from "mongoose";

const CreditOfferModel = new mongoose.Schema({
  creditRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creditRequests",
    required: [true, "O campo 'Solicitação de crédito' é obrigatório."],
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "banks",
  },
  offerDate: {
    type: Date,
    required: [true, "O campo 'Data da oferta' é obrigatório."],
  },
  offeredAmount: {
    type: Number,
    required: [true, "O campo 'Valor oferecido' é obrigatório."],
  },
  interestRate: {
    type: Number,
    required: [true, "O campo 'Taxa de juros' é obrigatório."],
  },
  totalCost: {
    type: Number,
    required: [true, "O campo 'Custo total' é obrigatório."],
  },
  expirationDate: {
    type: Date,
    required: [true, "O campo 'Data de expiração' é obrigatório."],
  },
  status: {
    type: String,
    required: [true, "O campo 'Status' é obrigatório."],
    enum: {
      values: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED"],
      message: "O valor '{VALUE}' não é um status de oferta válido.",
    },
  },
});

const creditOfferModel = mongoose.model("creditOffers", CreditOfferModel);

export default creditOfferModel;
