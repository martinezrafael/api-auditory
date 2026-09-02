import CardAcquirerService from "../services/CardAcquirerService.js";

class CardAcquirerController {
  static createCardAcquirer = async (req, res) => {
    const cardAcquirer = await CardAcquirerService.create(req.body);
    res.status(201).json({
      message: "Adquirente criado com sucesso.",
      cardAcquirer,
    });
  };

  static getAllCardAcquirers = async (req, res) => {
    const allCardAcquirers = await CardAcquirerService.getAll();
    res.status(200).json(allCardAcquirers);
  };

  static getCardAcquirerById = async (req, res) => {
    const cardAcquirer = await CardAcquirerService.getById(req.params.id);
    res.status(200).json(cardAcquirer);
  };

  static updateCardAcquirer = async (req, res) => {
    const cardAcquirer = await CardAcquirerService.update(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: "Dados do adquirente atualizados com sucesso.",
      cardAcquirer: cardAcquirer,
    });
  };

  static deleteCardAcquirer = async (req, res) => {
    await CardAcquirerService.delete(req.params.id);
    res.status(200).json({
      message: "Adquirente deletado com sucesso.",
    });
  };
}

export default CardAcquirerController;
