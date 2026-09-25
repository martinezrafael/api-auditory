import mongoose from "mongoose";

/**
 * Interface do documento de Documento digital/comprovante.
 *
 * @typedef {Object} IDocument
 * @property {mongoose.Types.ObjectId} company - ID da empresa vinculada ao documento.
 * @property {mongoose.Types.ObjectId|null} [audit=null] - ID da auditoria associada ao documento (opcional).
 * @property {"ID"|"SOCIAL_CONTRACT"|"BANK_STATEMENT"|"TAX_RECEIPT"} documentType - Categoria/tipo do documento enviado.
 * @property {string} fileUrl - URL ou caminho de armazenamento do arquivo digitalizado.
 * @property {Date} [uploadDate] - Data e hora de envio do arquivo (padrão: data atual).
 * @property {"PENDING"|"VALIDATED"|"REJECTED"} [validationStatus="PENDING"] - Status da validação documental.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Esquema do Mongoose para a coleção de Documentos (`documents`).
 * Define a estrutura dos documentos, validações de campos, relacionamentos com empresas/auditorias e enums de validação.
 */
const DocumentModel = new mongoose.Schema(
  {
    /**
     * Referência à empresa proprietária do documento.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },

    /**
     * Referência ao processo de auditoria associado ao documento (se houver).
     * @type {mongoose.Schema.Types.ObjectId|null}
     * @see {@link Audit} - Relacionamento com o model/coleção 'audits'.
     * @default null
     */
    audit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "audits",
      default: null,
    },

    /**
     * Tipo/Classificação do documento enviado.
     * Valores permitidos:
     * - `"ID"`: Documento de Identificação (RG/CNH).
     * - `"SOCIAL_CONTRACT"`: Contrato Social ou Estatuto.
     * - `"BANK_STATEMENT"`: Extrato Bancário.
     * - `"TAX_RECEIPT"`: Comprovante Fiscal ou Contábil.
     *
     * @type {string}
     */
    documentType: {
      type: String,
      required: [true, "O campo 'Tipo de documento' é obrigatório."],
      enum: {
        values: ["ID", "SOCIAL_CONTRACT", "BANK_STATEMENT", "TAX_RECEIPT"],
        message: "O valor '{VALUE}' não é um tipo de documento válido.",
      },
    },

    /**
     * URL ou localização do arquivo salvo no serviço de armazenamento (e.g., S3, local storage).
     * @type {string}
     */
    fileUrl: {
      type: String,
      required: [true, "O campo 'URL do arquivo' é obrigatório."],
    },

    /**
     * Data e hora do envio do documento.
     * @type {Date}
     * @default Date.now
     */
    uploadDate: {
      type: Date,
      default: Date.now,
    },

    /**
     * Status do processo de conferência e verificação do documento.
     * Valores permitidos:
     * - `"PENDING"`: Aguardando verificação.
     * - `"VALIDATED"`: Aprovado/Validado.
     * - `"REJECTED"`: Recusado/Inválido.
     *
     * @type {string}
     * @default "PENDING"
     */
    validationStatus: {
      type: String,
      required: [true, "O campo 'Status de validação' é obrigatório."],
      enum: {
        values: ["PENDING", "VALIDATED", "REJECTED"],
        message: "O valor '{VALUE}' não é um status de validação válido.",
      },
      default: "PENDING",
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
  },
);

/**
 * Modelo de dados do Mongoose para a coleção 'documents'.
 * Interface para manipulação e persistência de documentos digitais no banco de dados.
 *
 * @type {mongoose.Model<IDocument>}
 */
const documentModel = mongoose.model("documents", DocumentModel);

export default documentModel;
