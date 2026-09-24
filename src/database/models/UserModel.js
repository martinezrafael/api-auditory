import mongoose from "mongoose";

/**
 * Esquema do Mongoose para a coleção de Usuários.
 * Define a estrutura dos documentos, validações de campos e relacionamentos.
 *
 * @typedef {Object} IUser
 * @property {mongoose.Types.ObjectId[]} [companies] - Lista de IDs das empresas vinculadas ao usuário.
 * @property {string} fullName - Nome completo do usuário (mínimo de 3 caracteres).
 * @property {string} email - Endereço de e-mail do usuário.
 * @property {string} password - Senha criptografada do usuário (mínimo de 8 caracteres, ocultado por padrão nas consultas).
 * @property {"ADMIN" | "AUDITOR" | "BUSINESS_OWNER" | "BANK_MANAGER"} role - Perfil/nível de acesso do usuário no sistema.
 * @property {boolean} [isActive=true] - Define se a conta do usuário está ativa.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização do registro (gerado automaticamente).
 */
const UserModel = new mongoose.Schema(
  {
    /**
     * Referências às empresas associadas ao usuário.
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    companies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
      },
    ],

    /**
     * Nome completo do usuário.
     * Campo obrigatório com validação de tamanho mínimo.
     * @type {string}
     */
    fullName: {
      type: String,
      required: [true, "O campo 'Nome completo' é obrigatório."],
      minLength: [
        3,
        "O campo 'Nome Completo' deve ter no mínimo 3 caracteres.",
      ],
    },

    /**
     * E-mail único do usuário para autenticação e contato.
     * @type {string}
     */
    email: {
      type: String,
      required: [true, "O campo 'E-mail' é obrigatório."],
    },

    /**
     * Senha de acesso do usuário.
     * Ocultada por padrão (`select: false`) para impedir vazamento em buscas comuns.
     * @type {string}
     */
    password: {
      type: String,
      required: [true, "O campo 'Senha' é obrigatório."],
      minLength: [8, "O campo 'Senha' deve ter no mínimo 8 caracteres."],
      select: false,
    },

    /**
     * Papel/Cargo do usuário dentro da aplicação.
     * Restrito aos valores definidos no enum.
     * @type {string}
     */
    role: {
      type: String,
      required: [true, "O campo 'Tipo de usuário' é obrigatório."],
      enum: {
        values: ["ADMIN", "AUDITOR", "BUSINESS_OWNER", "BANK_MANAGER"],
        message: "O valor '{VALUE}' não é um tipo de usuário válido.",
      },
    },

    /**
     * Status de ativação da conta do usuário.
     * @type {boolean}
     * @default true
     */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    /** Desabilita o campo de versionamento do Mongoose (`__v`). */
    versionKey: false,
    /** Adiciona automaticamente os campos `createdAt` e `updatedAt`. */
    timestamps: true,
  },
);

/**
 * Modelo de dados do Mongoose para a coleção 'users'.
 * Fornece a interface para operações de CRUD no banco de dados.
 *
 * @type {mongoose.Model<IUser>}
 */
const userModel = mongoose.model("users", UserModel);

export default userModel;
