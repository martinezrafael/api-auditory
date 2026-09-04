import mongoose from "mongoose";

const AddressModel = new mongoose.Schema(
  {
    zipCode: {
      type: String,
      required: [true, "O campo 'CEP' é obrigatório."],
    },
    street: {
      type: String,
      required: [true, "O campo 'Rua' é obrigatório."],
    },
    number: {
      type: String,
      required: [true, "O campo 'Número' é obrigatório."],
    },
    complement: {
      type: String,
    },
    neighborhood: {
      type: String,
      required: [true, "O campo 'Bairro' é obrigatório."],
    },
    city: {
      type: String,
      required: [true, "O campo 'Cidade' é obrigatório."],
    },
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
