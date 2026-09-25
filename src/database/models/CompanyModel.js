import mongoose from "mongoose";
import AddressModel from "./AddressModel.js";

/**
 * Interface do documento de Empresa (`Company`).
 *
 * @typedef {Object} ICompany
 * @property {mongoose.Types.ObjectId[]} [users] - Lista de IDs dos usuários vinculados à empresa.
 * @property {mongoose.Types.ObjectId} createdBy - ID do usuário que realizou o cadastro da empresa.
 * @property {string} legalName - Razão social da empresa (única no sistema).
 * @property {string} [tradeName] - Nome fantasia da empresa.
 * @property {string} documentNumber - Número do CNPJ da empresa (único no sistema).
 * @property {string} cnaeCode - Código do CNAE (Classificação Nacional de Atividades Econômicas).
 * @property {import("./AddressModel.js").IAddress} address - Objeto com os dados do endereço estruturado da empresa.
 * @property {number} contactPhone - Número de telefone principal de contato.
 * @property {string} [contactEmail] - Endereço de e-mail de contato da empresa.
 * @property {number} [creditScore=0] - Pontuação de crédito da empresa.
 * @property {boolean} [isDeleted=false] - Indicador de exclusão lógica (Soft Delete).
 * @property {Date|null} [deletedAt=null] - Timestamp da realização da exclusão lógica.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Esquema do Mongoose para a coleção de Empresas (`companies`).
 * Define a estrutura dos documentos, validações de campos, tipos, chave única e relacionamentos.
 */
const CompanyModel = new mongoose.Schema(
  {
    /**
     * Referência ao usuário responsável pela criação do cadastro.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link User} - Relacionamento com o model/coleção 'users'.
     */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    /**
     * Razão Social da empresa.
     * Campo obrigatório e único.
     * @type {string}
     */
    legalName: {
      type: String,
      required: [true, "O campo 'Razão Social' é obrigatório."],
      unique: true,
    },

    /**
     * Nome Fantasia da empresa.
     * @type {string}
     */
    tradeName: {
      type: String,
    },

    /**
     * Número do CNPJ da empresa.
     * Campo obrigatório e único.
     * @type {string}
     */
    documentNumber: {
      type: String,
      required: [true, "O campo 'CNPJ' é obrigatório."],
      unique: true,
    },

    /**
     * Código da atividade econômica principal (CNAE).
     * @type {string}
     */
    cnaeCode: {
      type: String,
      required: [true, "O campo 'CNAE' é obrigatório."],
    },

    /**
     * Objeto de endereço estruturado.
     * @type {typeof AddressModel}
     */
    address: {
      type: AddressModel,
      required: [true, "O campo 'Endereço' é obrigatório."],
    },

    /**
     * Telefone de contato da empresa.
     * @type {number}
     */
    contactPhone: {
      type: Number,
      required: [true, "O campo 'Telefone de contato' é obrigatório."],
    },

    /**
     * E-mail de contato comercial/institucional da empresa.
     * @type {string}
     */
    contactEmail: {
      type: String,
    },

    /**
     * Score de crédito da empresa.
     * @type {number}
     * @default 0
     */
    creditScore: {
      type: Number,
      default: 0,
    },

    /**
     * Flag indicadora de exclusão lógica (Soft Delete).
     * @type {boolean}
     * @default false
     */
    isDeleted: {
      type: Boolean,
      default: false,
    },

    /**
     * Timestamp da realização do Soft Delete.
     * @type {Date|null}
     * @default null
     */
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    /** Desabilita o campo de versionamento do Mongoose (`__v`). */
    versionKey: false,
    /** Adiciona automaticamente os campos `createdAt` e `updatedAt`. */
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CompanyModel.virtual("users", {
  ref: "users",
  localField: "_id",
  foreignField: "company",
  match: { isDeleted: { $ne: true } },
});

/**
 * Modelo de dados do Mongoose para a coleção 'companies'.
 * Interface para realização de operações de banco de dados da entidade Empresa.
 *
 * @type {mongoose.Model<ICompany>}
 */
const companyModel = mongoose.model("companies", CompanyModel);

export default companyModel;
