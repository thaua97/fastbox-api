'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  products () {
    return this.hasMany('App/Models/User')
  }

  images () {
    return this.belongsTo('App/Models/Image')
  }
}

module.exports = Category
