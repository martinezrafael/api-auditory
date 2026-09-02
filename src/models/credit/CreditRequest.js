import mongoose from "mongoose";

const CreditRequestModel = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  requestDate: {
    type: Date,
    required: [true, "Data da solicitação é um campo obrigatório."],
  },
  requestedAmount: {
    type: Number,
    required: [true, "Valor solicitado é um campo obrigatório."],
  },
  requiredScore: {
    type: Number,
    required: [true, "Pontuação necessária é um campo obrigatório."],
  },
  installmentsLimit: {
    type: Number,
    required: [true, "Limite de parcelas é um campo obrigatório."],
  },
  status: {
    type: String,
    required: [true, "Status da solicitação é um campo obrigatório."],
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
      message:
        "Status da solicitação deve ser um dos seguintes valores: MISSING_DOCS, UNDER_REVIEW, OFFERS_AVAILABLE, APPROVED, RELEASED, DENIED, CANCELED.",
    },
  },
});

const creditRequestModel = mongoose.model("creditRequests", CreditRequestModel);

export default creditRequestModel;
