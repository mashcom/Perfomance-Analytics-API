import Fight from "App/Models/Fight";

export default class FightsController {

  public async index({ response }) {
    const fights = await Fight.query().preload("boxer").preload("opponent");
    return response.status(200).send(fights);
  }


  public async store({ request, response }) {
    const fight = new Fight();
    fight.rounds = request.body().rounds;
    fight.boxer1 = request.body().boxer1;
    fight.boxer2 = request.body().boxer2;
    fight.description = request.body().description;
    if (await fight.save()) {
      return response.status(200).send({ message: "Fight added successfully", data: fight });
    }
    return response.status(400).send({ message: "Fight could not be added" });
  }

  async show({ params, response }) {
    const fight = await Fight.query()
      .where("id", params.id)
      .preload("boxer")
      .preload("opponent")
      .firstOrFail();
    return response.status(200).send(fight);
  }
}


