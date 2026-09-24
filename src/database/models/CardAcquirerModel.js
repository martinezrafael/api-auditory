import mongoose from "mongoose";

const CardAcquirerModel = new mongoose.Schema(
  {
    /** Nome comercial da credenciadora (ex: "Cielo", "Stone", "Rede") */
    acquirerName: {
      type: String,
      required: [true, "O campo 'Nome do adquirente' é obrigatório."],
      trim: true,
    },

    /** CNPJ da adquirente */
    documentNumber: {
      type: String,
      required: [true, "O campo 'CNPJ' é obrigatório."],
      trim: true,
      unique: true,
    },

    /** Soft Delete e Status */
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const cardAcquirerModel = mongoose.model("cardAcquirers", CardAcquirerModel);
export default cardAcquirerModel;
