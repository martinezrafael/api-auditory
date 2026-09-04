import mongoose from "mongoose";

const ContractFeeModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    acquirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cardAcquirers",
      required: [true, "O campo 'Adquirente' é obrigatório."],
    },
    paymentMethod: {
      type: String,
      required: [true, "O campo 'Método de pagamento' é obrigatório."],
      enum: {
        values: ["CREDIT", "DEBIT", "VOUCHER"],
        message: "O valor '{VALUE}' não é um método de pagamento válido.",
      },
    },
    minInstallments: {
      type: Number,
      default: 1,
    },
    maxInstallments: {
      type: Number,
      default: 1,
    },
    agreedFeePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa contratual (%)' é obrigatório."],
    },
  },
  { versionKey: false, timestamps: true },
);

const contractFeeModel = mongoose.model("contractFees", ContractFeeModel);

export default contractFeeModel;
