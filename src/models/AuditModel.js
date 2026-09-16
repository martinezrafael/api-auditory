import mongoose from "mongoose";

const AuditModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    auditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    startDate: {
      type: Date,
      required: [true, "O campo 'Data inicial' é obrigatório."],
    },
    endDate: {
      type: Date,
      required: [true, "O campo 'Data final' é obrigatório."],
    },
    totalTransactionsAudited: {
      type: Number,
      default: 0,
    },
    totalDiscrepancyAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      enum: {
        values: ["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"],
        message: "O valor '{VALUE}' não é um status de auditoria válido.",
      },
      default: "PENDING",
    },
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
