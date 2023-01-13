import Action from "App/Models/Action";

export default class ActionsController {

  public async index({ response }) {
    const actions = await Action.all();
    return response.status(200).send(actions);
  }

  public async store({ request, response }) {
    const action = new Action();
    action.info_id = request.body().info_id;
    action.name = request.body().name;
    if (await action.save()) {
      return response.status(200).send({ message: "Action added successfully", data: await Action.find(action.id) });
    }
    return response.status(400).send({ message: "Action could not be added" });
  }

  async destroy({  params, response }) {
    const action = await Action.findOrFail(params.id)
    await action.delete();
      return response.status(200).send({ message: "Action deleted successfully" });

  }
}
