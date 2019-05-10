'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/** Authentication Routes */
Route.post('/register', 'UserController.create')
Route.post('/auth', 'AuthController.create')


