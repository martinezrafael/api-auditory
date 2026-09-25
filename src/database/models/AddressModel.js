import mongoose from "mongoose";

/**
 * Interface do subdocumento de Endereço (`Address`).
 * Utilizado como subesquema incorporado em outras entidades (como Empresas ou Usuários).
 *
 * @typedef {Object} IAddress
 * @property {string} zipCode - Código de Endereçamento Postal (CEP).
 * @property {string} street - Logradouro / Nome da rua ou avenida.
 * @property {string} number - Número do imóvel ou complemento numérico.
 * @property {string} [complement] - Complemento do endereço (ex: Bloco, Sala, Apto) - opcional.
 * @property {string} neighborhood - Bairro ou distrito.
 * @property {string} city - Nome do município/cidade.
 * @property {"AC"|"AL"|"AP"|"AM"|"BA"|"CE"|"DF"|"ES"|"GO"|"MA"|"MT"|"MS"|"MG"|"PA"|"PB"|"PR"|"PE"|"PI"|"RJ"|"RN"|"RS"|"RO"|"RR"|"SC"|"SP"|"SE"|"TO"} state - Sigla do estado brasileiro (UF) em maiúsculas.
 * @property {Date} createdAt - Data e hora de criação do registro (gerado automaticamente).
 * @property {Date} updatedAt - Data e hora da última atualização (gerado automaticamente).
 */

/**
 * Subesquema do Mongoose para representação de Endereços (`AddressModel`).
 * Configurado com `_id: false` por ser incorporado (embedded) dentro de outros modelos principais.
 */
const AddressModel = new mongoose.Schema(
  {
    /**
     * CEP (Código de Endereçamento Postal).
     * @type {string}
     */
    zipCode: {
      type: String,
      required: [true, "O campo 'CEP' é obrigatório."],
    },

    /**
     * Nome do logradouro (Rua, Avenida, Alameda, etc.).
     * @type {string}
     */
    street: {
      type: String,
      required: [true, "O campo 'Rua' é obrigatório."],
    },

    /**
     * Número da residência ou estabelecimento.
     * @type {string}
     */
    number: {
      type: String,
      required: [true, "O campo 'Número' é obrigatório."],
    },

    /**
     * Complemento do endereço (ex: "Apto 101", "Bloco B").
     * @type {string}
     */
    complement: {
      type: String,
    },

    /**
     * Nome do bairro.
     * @type {string}
     */
    neighborhood: {
      type: String,
      required: [true, "O campo 'Bairro' é obrigatório."],
    },

    /**
     * Nome do município.
     * @type {string}
     */
    city: {
      type: String,
      required: [true, "O campo 'Cidade' é obrigatório."],
    },

    /**
     * Sigla do Estado (UF - Unidade Federativa).
     * Armazenado obrigatoriamente em caixa alta com validação para todas as 27 UFs brasileiras.
     *
     * @type {string}
     */
    state: {
      type: String,
      required: [true, "O campo 'Estado (UF)' é obrigatório."],
      uppercase: true,
      enum: {
        values: [
          "AC",
          "AL",
          "AP",
          "AM",
          "BA",
          "CE",
          "DF",
          "ES",
          "GO",
          "MA",
          "MT",
          "MS",
          "MG",
          "PA",
          "PB",
          "PR",
          "PE",
          "PI",
          "RJ",
          "RN",
          "RS",
          "RO",
          "RR",
          "SC",
          "SP",
          "SE",
          "TO",
        ],
        message: "O valor '{VALUE}' não é um estado brasileiro válido.",
      },
    },
  },
  {
    /** Desabilita a geração automática de `__v`. */
    versionKey: false,
    /** Adiciona automaticamente os campos `createdAt` e `updatedAt`. */
    timestamps: true,
    /** Desabilita a geração de `_id` próprio para ser usado como subdocumento incorporado. */
    _id: false,
  },
);

export default AddressModel;
