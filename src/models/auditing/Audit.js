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
    },
    scheduleDate: {
      type: Date,
      required: [true, "O campo 'Data agendada' é obrigatório."],
    },
    completionDate: {
      type: Date,
      default: null,
    },
    deadline: {
      type: Date,
      required: [true, "O campo 'Prazo limite' é obrigatório."],
    },
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      enum: {
        values: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"],
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
