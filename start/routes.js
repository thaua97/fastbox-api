'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/** Authentication Routes */
Route.post('/signup', 'UserController.signup')
Route.post('/signin', 'UserController.signin')

Route.resource('products', 'ProductController')
  .apiOnly()
  .middleware('auth')

Route.resource('categories', 'CategoryController')
  .apiOnly()
  .middleware('auth')

Route.resource('companies', 'CompanyController')
  .apiOnly()
  .middleware('auth')

//Images Routes
Route.post('/users/:id/image', 'ImageController.storeUserImage')
  .middleware('auth')

Route.post('/categories/:id/image', 'ImageController.storeCategoryImage')
  .middleware('auth')

Route.post('/companies/:id/image', 'ImageController.storeCompanyImage')
  .middleware('auth')
