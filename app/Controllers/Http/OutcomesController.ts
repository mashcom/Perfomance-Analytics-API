import Outcome from "App/Models/Outcome";
import Info from "App/Models/Info";
import Report from "App/Models/Report";

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
    outcome.target_id = (request.body().target_id == null) ? 4 : request.body().target_id;
    outcome.round = request.body().round;

    console.log(request.body());
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

    let outcomes = await Outcome.query()
      .where("fight_id", params.id)
      .distinct("round");

    const actions = await Outcome.query()
      .where("fight_id", params.id)
      .preload("action_details")
      .distinct("action_id");

    const fighters = await Outcome.query()
      .where("fight_id", params.id)
      .preload("boxer")
      .distinct("boxer_id");

    const targets = await Outcome.query()
      .where("fight_id", params.id)
      .preload("target")
      .distinct("target_id");

    const action_outcomes = await Outcome.query()
      .where("fight_id", params.id)
      .distinct("outcome");

    outcomes.map(async (round) => {
      round.actions = actions;
      await round.actions.map(async (action) => {
        action.boxers = fighters;
        await action.boxers.map(async (boxer) => {
          boxer.boxer.targets = targets;
          await boxer.boxer.targets.map(async (target) => {
            target.target.outcomes = action_outcomes;
            await target.target.outcomes.map(async (outcome_count) => {
              //console.log(round.$attributes.round);
              const total = await this.getTotalForAction(
                params.id,
                boxer.$attributes.boxer_id,
                target.$attributes.target_id,
                outcome_count.$attributes.outcome,
                action.$attributes.action_id,
                round.$attributes.round
              );
              console.log(total);

            });
          });
        });
      });

    });

    const r = await Info.query()
      .preload("actions", (actionsQuery) => {
        actionsQuery.preload("outcomes", (outcomesQuery) => {
          outcomesQuery.where("fight_id", params.id).preload("boxer").preload("target");
        });
      });
    return response.status(200).send(r);

  }

  async getTotalForAction(fight_id, boxer_id, target_id, outcome_id, action_id, round) {
    //console.log(boxer_id);return 0;
    const total = await Outcome.query()
      .where("fight_id", fight_id)
      .where("boxer_id", boxer_id)
      .where("target_id", target_id)
      .where("outcome", outcome_id)
      .where("action_id", action_id)
      .where("round", round)

      .count("id", "total")
      .first();

    const report_exists = await Report.query()
      .where("action_id", action_id)
      .where("outcome", outcome_id)
      .where("boxer_id", boxer_id)
      .where("fight_id", fight_id)
      .where("target_id", target_id)
      .where("round", round)
      .first();


    const outcome = (report_exists == undefined) ? new Report() : report_exists;

    outcome.action_id = action_id;
    outcome.outcome = outcome_id;
    outcome.boxer_id = boxer_id;
    outcome.fight_id = fight_id;
    outcome.target_id = target_id;
    outcome.round = round;
    outcome.total = total.$attributes.total;
    outcome.save();
    return total.$attributes.total;


  }

}
