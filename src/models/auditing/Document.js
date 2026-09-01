import mongoose from "mongoose";

const DocumentModel = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    documentType: {
      type: String,
      required: [true, "Tipo de documento é um campo obrigatório."],
      enum: {
        values: ["ID", "SOCIAL_CONTRACT", "BANK_STATEMENT", "TAX_RECEIPT"],
        message: "O tipo {VALUE} não é um tipo válido.",
      },
    },
    fileUrl: {
      type: String,
      required: [true, "Caminho para o arquivo é um campo obrigatório."],
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    validationStatus: {
      type: String,
      enum: {
        values: ["PENDING", "VALIDATED", "REJECTED"],
        message: "{VALUE} não é um status válido.",
      },
      default: "PENDING",
      required: [true, "Status de validação é um campo obrigatório."],
    },
  },
  { versionKey: false, timestamps: true },
);

const documentModel = mongoose.model("documents", DocumentModel);

export default documentModel;
