import mongoose from "mongoose";

/**
 * Interface do documento de Auditoria.
 *
 * @typedef {Object} IAudit
 * @property {mongoose.Types.ObjectId} company - ID da empresa auditada.
 * @property {mongoose.Types.ObjectId|null} [auditor=null] - ID do usuário responsável pela condução da auditoria.
 * @property {Date} startDate - Data inicial do período auditado.
 * @property {Date} endDate - Data final do período auditado.
 * @property {number} [totalTransactionsAudited=0] - Quantidade total de transações processadas na auditoria.
 * @property {number} [totalDiscrepancyAmount=0] - Valor total acumulado de divergências/discrepâncias encontradas.
 * @property {"PENDING"|"IN_PROGRESS"|"COMPLETED"|"FAILED"} [status="PENDING"] - Status do processamento da auditoria.
 * @property {string|null} [notes=null] - Observações ou anotações adicionais relativas à auditoria.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Esquema do Mongoose para a coleção de Auditorias (`audits`).
 * Define a estrutura dos documentos, validações de campos, status operacionais e relacionamentos.
 */
const AuditModel = new mongoose.Schema(
  {
    /**
     * Referência à empresa auditada.
     * @type {mongoose.Schema.Types.ObjectId}
     * @see {@link Company} - Relacionamento com o model/coleção 'companies'.
     */
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },

    /**
     * Referência ao usuário/auditante responsável (opcional).
     * @type {mongoose.Schema.Types.ObjectId|null}
     * @see {@link User} - Relacionamento com o model/coleção 'users'.
     * @default null
     */
    auditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },

    /**
     * Data de início do período compreendido pela auditoria.
     * @type {Date}
     */
    startDate: {
      type: Date,
      required: [true, "O campo 'Data inicial' é obrigatório."],
    },

    /**
     * Data de término do período compreendido pela auditoria.
     * @type {Date}
     */
    endDate: {
      type: Date,
      required: [true, "O campo 'Data final' é obrigatório."],
    },

    /**
     * Quantidade total de transações auditadas durante a execução.
     * @type {number}
     * @default 0
     */
    totalTransactionsAudited: {
      type: Number,
      default: 0,
    },

    /**
     * Somatório financeiro das divergências encontradas entre a adquirente e a empresa.
     * @type {number}
     * @default 0
     */
    totalDiscrepancyAmount: {
      type: Number,
      default: 0,
    },

    /**
     * Status atual do processo de auditoria.
     * Valores permitidos: `"PENDING"`, `"IN_PROGRESS"`, `"COMPLETED"`, `"FAILED"`.
     * @type {string}
     * @default "PENDING"
     */
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      enum: {
        values: ["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"],
        message: "O valor '{VALUE}' não é um status de auditoria válido.",
      },
      default: "PENDING",
    },

    /**
     * Observações técnicas ou justificativas sobre o relatório de auditoria.
     * @type {string|null}
     * @default null
     */
    notes: {
      type: String,
      trim: true,
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
 * Modelo de dados do Mongoose para a coleção 'audits'.
 * Interface para manipulação e persistência de relatórios e execuções de auditorias no banco de dados.
 *
 * @type {mongoose.Model<IAudit>}
 */
const auditModel = mongoose.model("audits", AuditModel);

export default auditModel;
