'use strict'

const Company = use('App/Models/Company')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {
  /**
   * Show a list of all companies.
   * GET companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ }) {
    const company = await Company.all()

    return company
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const { id } = auth.user

    const data = request.only([
      'social_name',
      'cnpj',
      'type',
    ])

    const company = await Company.create({ ...data, user_id: id})

    return company
  }

  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {object} ctx
   *
   */
  async show ({ params }) {
    const company = await Company.findOrFail(params.id)

    await company.load('users')

    return company
  }
  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const company = await Company.findByOrFail(params.id)

    const data = request.all()

    company.merge(data)

    await company.sate()

    return company
  }


  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const company = await Company.findByOrFail(params.id)

    if (auth.user.id !== company.responsible_id){
      return response.status(401).send({ error: 'Não possui autorização para isso! '})
    }
    await company.delete()
  }
}

module.exports = CompanyController
