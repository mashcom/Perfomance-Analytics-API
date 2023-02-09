import Report from "App/Models/Report";

export default class RoundController {

  async show({ params, response }) {
    const rounds = await Report.query().where("fight_id", params.id)
      .distinct("round");
    return response.status(200).send(rounds);

  }

}
