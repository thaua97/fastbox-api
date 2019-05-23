'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/** Authentication Routes */
Route.post('/register', 'UserController.signup')
Route.post('/auth', 'UserController.signin')

/** Product Routes
 *
 * GET, POST, PUT and DELETE
 */
Route.resource('products', 'ProductsController')
  .apiOnly()
  .middleware('auth')

