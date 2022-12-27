import Boxer from "App/Models/Boxer";
import { response } from "express";

export default class BoxersController {
  public async index({ response }) {
    const boxers = await Boxer.query()
      .preload("home_fight")
      .preload("away_fight");
    return response.status(200).send(boxers);
  }

  async show({ params,response }) {
    const boxer = await Boxer.query()
      .where("id", params.id)
      .firstOrFail();
    return response.status(200).send(boxer);
  }

  public async store({ request, response }) {
    const boxer = new Boxer();
    boxer.name = request.body().name;
    boxer.description = request.body().description;
    boxer.dob = request.body().dob;
    boxer.weight = request.body().weight;
    boxer.height = request.body().height;
    boxer.reach = request.body().reach;
    if (await boxer.save()) {
      return response.status(200).send({ message: "Boxer added successfully", data: await Boxer.find(boxer.id) });
    }
    return response.status(400).send({ message: "Boxer could not be added" });
  }
}
