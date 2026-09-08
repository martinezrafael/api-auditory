import mongoose from "mongoose";

const ContractFeeModel = new mongoose.Schema(
  {
    // EMPRESA VINCULADA AO CONTRATO
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    // ADQUIRENTE VINCULADO AO CONTRATO
    acquirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cardAcquirers",
      required: [true, "O campo 'Adquirente' é obrigatório."],
    },
    // MÉTODOS DE PAGAMENTO VINCULADOS AO CONTRATO
    paymentMethod: {
      type: String,
      required: [true, "O campo 'Método de pagamento' é obrigatório."],
      enum: {
        values: ["CREDIT", "DEBIT", "VOUCHER"],
        message: "O valor '{VALUE}' não é um método de pagamento válido.",
      },
    },
    // MINÍMO DE PARCELAS
    minInstallments: {
      type: Number,
      default: 1,
    },
    // MÁXIMO DE PARCELAS
    maxInstallments: {
      type: Number,
      default: 1,
    },
    // PERCENTUAL DA TAXA ACORDADA
    agreedFeePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa contratual (%)' é obrigatório."],
    },
  },
  { versionKey: false, timestamps: true },
);

const contractFeeModel = mongoose.model("contractFees", ContractFeeModel);

export default contractFeeModel;
