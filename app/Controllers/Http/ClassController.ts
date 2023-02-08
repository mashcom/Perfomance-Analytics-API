import Class from "App/Models/Class";

export default class ClassController {
  public async index({ response }) {
    const classes = await Class.all();
    return response.status(200).send(classes);
  }

}
