import Outcome from "App/Models/Outcome";
import Info from "App/Models/Info";

export default class OutcomesController {
  public async index({ response }) {
    const outcome = await Outcome.all();
    return response.status(200).send(outcome);
  }

  public async store({ request, response }) {
    const outcome = new Outcome();
    outcome.action_id = request.body().action_id;
    outcome.outcome = request.body().outcome;
    outcome.boxer_id = request.body().boxer_id;
    outcome.fight_id = request.body().fight_id;
    outcome.target_id = (request.body().target_id==null)?4:request.body().target_id;
    outcome.round = request.body().round;

    console.log(request.body())
    if (await outcome.save()) {
      return response.status(200).send({ message: "Outcome added successfully", data: await Outcome.find(outcome.id) });
    }
    return response.status(400).send({ message: "Outcome could not be added" });
  }

  async show({ params, response }) {
    const infos = await Info.query()
      .preload("actions", (actionsQuery) => {
        actionsQuery.preload("outcomes", (outcomesQuery) => {
          outcomesQuery.where("fight_id", params.id).preload("boxer").preload("target");
        });
      });

    return response.status(200).send(infos);
  }

}
