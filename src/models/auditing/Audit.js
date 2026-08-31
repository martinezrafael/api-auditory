import mongoose from "mongoose";

const AuditModel = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    ScheduleDate: {
      type: Date,
      required: [true, "Data agendada é um campo obrigatório."],
    },
    completionDate: {
      type: Date,
      default: null,
    },
    deadLine: {
      type: Date,
      required: [true, "Prazo limite é um campo obrigatório."],
    },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"],
      default: "PENDING",
      required: [true, "Status é um campo obrigatório."],
    },
    auditorName: {
      type: String,
      required: [true, "Nome do auditor é um campo obrigatório."],
      trim: true,
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
