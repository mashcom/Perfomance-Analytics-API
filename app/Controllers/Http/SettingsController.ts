import Info from 'App/Models/Info'
import Target from 'App/Models/Target'
export default class ActionsController {
  public async index({ response }) {
    const infos = await Info.query().preload('actions')
    const targets = await Target.all()
    return response.status(200).send({
      infos:infos,
      targets:targets,
    })
  }
}
