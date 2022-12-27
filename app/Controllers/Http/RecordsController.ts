import Info from 'App/Models/Info'

export default class RecordsController {
  public async index({ view }) {
    const infos = await Info.all()
    return await view.render('record', {
      infos: infos,
    })
  }
}
