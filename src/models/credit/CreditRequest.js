import mongoose from "mongoose";

const CreditRequestModel = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: [true, "O campo 'Empresa' é obrigatório."],
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  requestDate: {
    type: Date,
    required: [true, "O campo 'Data da solicitação' é obrigatório."],
  },
  requestedAmount: {
    type: Number,
    required: [true, "O campo 'Valor solicitado' é obrigatório."],
  },
  requiredScore: {
    type: Number,
    required: [true, "O campo 'Pontuação necessária' é obrigatório."],
  },
  installmentsLimit: {
    type: Number,
    required: [true, "O campo 'Limite de parcelas' é obrigatório."],
  },
  status: {
    type: String,
    required: [true, "O campo 'Status' é obrigatório."],
    enum: {
      values: [
        "MISSING_DOCS",
        "UNDER_REVIEW",
        "OFFERS_AVAILABLE",
        "APPROVED",
        "RELEASED",
        "DENIED",
        "CANCELED",
      ],
      message: "O valor '{VALUE}' não é um status de solicitação válido.",
    },
  },
});

const creditRequestModel = mongoose.model("creditRequests", CreditRequestModel);

export default creditRequestModel;
