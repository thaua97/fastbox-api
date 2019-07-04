'use strict'

const User = use('App/Models/User')

class UserController {
  async signup ({request}) {
    const data = request.only(["username", "email", "password"])

    const user = await User.create(data)

    return user
  }

  async signin ({request, auth}) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)
    const user = await User.findBy('email', email)

    await user.load('images')

    return { user, token }
  }

}

module.exports = UserController
