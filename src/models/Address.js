import mongoose from "mongoose";

const AddressModel = new mongoose.Schema(
  {
    zipCode: {
      type: String,
      required: [true, "CEP é um campo obrigatório."],
    },
    street: {
      type: String,
      required: [true, "Rua é um campo obrigatório."],
    },
    number: {
      type: String,
      required: [true, "Número é um campo obrigatório."],
    },
    complement: {
      type: String,
    },
    neighborhood: {
      type: String,
      required: [true, "Bairro é um campo obrigatório."],
    },
    city: {
      type: String,
      required: [true, "Cidade é um campo obrigatório."],
    },
    state: {
      type: String,
      required: [true, "Estado (UF) é um campo obrigatório."],
      uppercase: true,
      enum: [
        values[
          ("AC",
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
          "TO")
        ],
      ],
      message: "{VALUE} não é um estado brasileiro válido.",
    },
  },
  { versionKey: false, timestamps: true, _id: false },
);

export default AddressModel;
