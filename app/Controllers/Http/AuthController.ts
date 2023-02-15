import Login from 'App/Models/Login'

export default class AuthController {
  public async index({ response }) {
    const users = await Login.query()
    return response.status(200).send(users)
  }

  public async store({ request, response }) {
    //console.log(request.body().data.user);return;
    const login = new Login()
    login.username = request.body().data.user
    login.password = request.body().data.password
    if (await login.save()) {
      return response.status(200).send({ message: 'User Created' })
    }
    return response.status(400).send({ message: 'User not created ' })
  }
}
