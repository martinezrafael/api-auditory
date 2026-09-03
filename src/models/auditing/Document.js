import mongoose from "mongoose";

const DocumentModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    audit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "audits",
      default: null,
    },
    documentType: {
      type: String,
      required: [true, "O campo 'Tipo de documento' é obrigatório."],
      enum: {
        values: ["ID", "SOCIAL_CONTRACT", "BANK_STATEMENT", "TAX_RECEIPT"],
        message: "O valor '{VALUE}' não é um tipo de documento válido.",
      },
    },
    fileUrl: {
      type: String,
      required: [true, "O campo 'URL do arquivo' é obrigatório."],
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    validationStatus: {
      type: String,
      required: [true, "O campo 'Status de validação' é obrigatório."],
      enum: {
        values: ["PENDING", "VALIDATED", "REJECTED"],
        message: "O valor '{VALUE}' não é um status de validação válido.",
      },
      default: "PENDING",
    },
  },
  { versionKey: false, timestamps: true },
);

const documentModel = mongoose.model("documents", DocumentModel);

export default documentModel;
