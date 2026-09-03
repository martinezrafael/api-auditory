import mongoose from "mongoose";

const CreditOfferSchema = new mongoose.Schema({
  creditRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creditRequests",
    required: [true, "Solicitação de crédito é um campo obrigatório."],
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "banks",
  },
  offerDate: {
    type: Date,
    required: [true, "Data da oferta é um campo obrigatório."],
  },
  offeredAmount: {
    type: Number,
    required: [true, "Valor oferecido é um campo obrigatório."],
  },
  interestRate: {
    type: Number,
    required: [true, "Taxa de juros é um campo obrigatório."],
  },
  totalCost: {
    type: Number,
    required: [true, "Custo total é um campo obrigatório."],
  },
  expirationDate: {
    type: Date,
    required: [true, "Data de expiração é um campo obrigatório."],
  },
  status: {
    type: String,
    required: [true, "Status da oferta é um campo obrigatório."],
    enum: {
      values: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED"],
      message:
        "Status da oferta deve ser um dos seguintes valores: PENDING, ACCEPTED, REJECTED, EXPIRED.",
    },
  },
});

const creditOfferModel = mongoose.model("creditOffers", CreditOfferSchema);

export default creditOfferModel;
