// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Target from "App/Models/Target";

export default class TargetsController {

  public async index({ response }) {
    const target = await Target.all();
    return response.status(200).send(target);
  }

  public async store({ request, response }) {
    const target = new Target();
    target.name = request.body().name;
    if (await target.save()) {
      return response.status(200).send({ message: "Target added successfully", data: await Target.find(target.id) });
    }
    return response.status(400).send({ message: "Target could not be added" });
  }
}
