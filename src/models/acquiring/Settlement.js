import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    settlementDate: {
      type: Date,
      required: [true, "Data do repasse é um campo obrigatório."],
    },
    expectedDate: {
      type: Date,
      required: [true, "Data esperada do repasse é um campo obrigatório."],
    },
    settlementAmount: {
      type: Number,
      required: [true, "Valor do repasse é um campo obrigatório."],
    },
    status: {
      type: String,
      required: [true, "Status do repasse é um campo obrigatório."],
      trim: true,
      enum: {
        values: ["SCHEDULED", "PAID", "DISPUTED"],
        message:
          "Status do repasse inválido. Deve ser 'SCHEDULED', 'PAID' ou 'DISPUTED'.",
      },
    },
  },
  { versionKey: false, timestamps: true },
);

const settlementModel = mongoose.model("settlements", settlementSchema);
export default settlementModel;
