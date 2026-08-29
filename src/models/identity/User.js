import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    fullName: {
      type: String,
      required: [true, "Nome completo é um campo obrigatório."],
    },
    email: {
      type: String,
      required: [true, "E-mail é um campo obrigatório."],
    },
    password: {
      type: String,
      required: [true, "Senha é um campo obrigatório."],
      minLength: [8, "Senha deve ter pelo menos 8 caracteres."],
      select: false,
    },
    role: {
      type: String,
      required: [true, "Tipo de usuário é um campo obrigatório."],
      enum: {
        values: ["ADMIN", "AUDITOR", "BUSINESS_OWNER", "BANK_MANAGER"],
        message: "{VALUE} não é um tipo válido.",
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
