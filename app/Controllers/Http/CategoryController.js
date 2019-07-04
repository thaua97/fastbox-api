'use strict'

const Category = use("App/Models/Category")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */

class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   *
   */
  async index () {
    const category = await Category.query()
      .with('images')
      .fetch()

    return category
  }
  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   *
   */
  async store ({ request }) {
    const data = request.only([ 'name', 'description' ])

    const category = await Category.create(data)

    return category
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   *
   */
  async show ({ params }) {
    const category = await Category.findByOrFail('name', params.name)

    await category.load('images')

    return category
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   *
   */
  async update ({ params, request }) {
    const category = await Category.findByOrFail(params.id)

    const data = request.all()

    category.merge(data)

    await category.sate()

    return category
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const category = await Category.findByOrFail(params.id)

    if (auth.user.type !== 'admin'){
      return response.status(401).send({ error: 'Não possui autorização para isso! '})
    }
    await category.delete()
  }
}

module.exports = CategoryController
