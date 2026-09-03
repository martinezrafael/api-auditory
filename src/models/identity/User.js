import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    fullName: {
      type: String,
      required: [true, "O campo 'Nome completo' é obrigatório."],
    },
    email: {
      type: String,
      required: [true, "O campo 'E-mail' é obrigatório."],
    },
    password: {
      type: String,
      required: [true, "O campo 'Senha' é obrigatório."],
      minLength: [8, "O campo 'Senha' deve ter no mínimo 8 caracteres."],
      select: false,
    },
    role: {
      type: String,
      required: [true, "O campo 'Tipo de usuário' é obrigatório."],
      enum: {
        values: ["ADMIN", "AUDITOR", "BUSINESS_OWNER", "BANK_MANAGER"],
        message: "O valor '{VALUE}' não é um tipo de usuário válido.",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const userModel = mongoose.model("users", UserModel);

export default userModel;
