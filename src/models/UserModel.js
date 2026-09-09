import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    // LISTA DE EMPRESAS QUE O USUÁRIO ESTÁ VINCULADO
    companies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
      },
    ],
    // NOME COMPLETO DO USUÁRIO
    fullName: {
      type: String,
      required: [true, "O campo 'Nome completo' é obrigatório."],
    },
    // EMAIL DO USUÁRIO
    email: {
      type: String,
      required: [true, "O campo 'E-mail' é obrigatório."],
    },
    // SENHA DE ACESSO
    password: {
      type: String,
      required: [true, "O campo 'Senha' é obrigatório."],
      minLength: [8, "O campo 'Senha' deve ter no mínimo 8 caracteres."],
      select: false,
    },
    // CARGO DO USUÁRIO (RBAC)
    role: {
      type: String,
      required: [true, "O campo 'Tipo de usuário' é obrigatório."],
      enum: {
        values: ["ADMIN", "AUDITOR", "BUSINESS_OWNER", "BANK_MANAGER"],
        message: "O valor '{VALUE}' não é um tipo de usuário válido.",
      },
    },
    // O USUÁRIO ESTÁ ATIVO?
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const userModel = mongoose.model("users", UserModel);

export default userModel;
