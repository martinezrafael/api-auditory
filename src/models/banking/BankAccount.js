import mongoose from "mongoose";

const BankAccountModel = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  bankName: {
    type: String,
    required: [true, "Nome do banco é um campo obrigatório."],
    trim: true,
  },
  agencyNumber: {
    type: String,
    required: [true, "Número da agência é um campo obrigatório."],
    trim: true,
  },
  accountNumber: {
    type: String,
    required: [true, "Número da conta é um campo obrigatório."],
    trim: true,
  },
  accountType: {
    type: String,
    enum: ["CHECKING", "SAVINGS"],
    required: [true, "Tipo de conta é um campo obrigatório."],
  },
});

const bankAccountModel = mongoose.model("bankAccounts", BankAccountModel);

export default bankAccountModel;
