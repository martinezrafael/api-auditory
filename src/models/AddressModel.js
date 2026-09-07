import mongoose from "mongoose";

const AddressModel = new mongoose.Schema(
  {
    //CEP
    zipCode: {
      type: String,
      required: [true, "O campo 'CEP' é obrigatório."],
    },
    // RUA
    street: {
      type: String,
      required: [true, "O campo 'Rua' é obrigatório."],
    },
    // NÚMERO
    number: {
      type: String,
      required: [true, "O campo 'Número' é obrigatório."],
    },
    // COMPLEMENTO
    complement: {
      type: String,
    },
    // BAIRRO
    neighborhood: {
      type: String,
      required: [true, "O campo 'Bairro' é obrigatório."],
    },
    //CIDADE
    city: {
      type: String,
      required: [true, "O campo 'Cidade' é obrigatório."],
    },
    // ESTADO (UF)
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
  { versionKey: false, timestamps: true, _id: false },
);

export default AddressModel;
