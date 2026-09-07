import mongoose from "mongoose";

const AuditModel = new mongoose.Schema(
  {
    // EMPRESA ALVO DO PROCESSO DE AUDITORIA
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    // AUDITOR RESPONSÁVEL
    auditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    // DATA DE INÍCIO DA AUDITORIA
    startDate: {
      type: Date,
      required: [true, "O campo 'Data inicial' é obrigatório."],
    },
    // DATA FIM DA AUDITORIA
    endDate: {
      type: Date,
      required: [true, "O campo 'Data final' é obrigatório."],
    },
    // TOTAL DE TRANSAÇÕES AUDITADAS
    totalTransactionsAudited: {
      type: Number,
      default: 0,
    },
    // TOTAL DE DIVERGÊNCIAS IDENTIFICADAS
    totalDiscrepancyAmount: {
      type: Number,
      default: 0,
    },
    // STATUS DA AUDITORIA
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      enum: {
        values: ["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"],
        message: "O valor '{VALUE}' não é um status de auditoria válido.",
      },
      default: "PENDING",
    },
    // OBSERVAÇÕES/ANOTAÇÕES
    notes: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const auditModel = mongoose.model("audits", AuditModel);

export default auditModel;
