'use strict'

const Helpers = use('Helpers')
const Image = use('App/Models/Image')
const Product = use('App/Models/Product')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
class ImageController {

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {params} ctx.params
   * @param {Request} ctx.request
   */
  async store ({ request, params }) {
    const product = await Product.findOrFail(params.id)

        const images = request.file('image', {
          types: ['image'],
          size: '2mb'
        })

        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
          name: `${Date.now()}-${file.clientName}`
        }))

        if (!images.movedAll()) {
          return images.errors()
        }

        await Promise.all(
          images
            .movedList()
            .map(image => product.images().create({ path: image.fileName }))
        )
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ImageController
