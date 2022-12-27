// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Info from "App/Models/Info";

export default class InfosController {
  public async index({ response }) {
    const info = await Info.query().preload('actions');
    return response.status(200).send(info);
  }

  public async store({ request, response }) {
    const info = new Info();
    info.name = request.body().name;
    if (await info.save()) {
      return response.status(200).send({ message: "Information added successfully", data: await Info.find(info.id) });
    }
    return response.status(400).send({ message: "Information could not be added" });
  }
}
