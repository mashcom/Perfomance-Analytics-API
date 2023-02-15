import Login from 'App/Models/Login'
import { types } from '@ioc:Adonis/Core/Helpers'

export default class LoginController {
  public async store({ request, response }) {
    const username = request.body().data.user
    const password = request.body().data.password

    try {
      const login = await Login.query()
        .where('username', username)
        .where('password', password)
        .firstOrFail()
      console.log(login)
      return response.status(200).send({ message: 'Login was successfull', data: login })
    } catch (error) {
      return response.status(403).send({ message: 'Login failed' })
    }
  }
}
