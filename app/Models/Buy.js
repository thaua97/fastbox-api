'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Buy extends Model {
  products () {
    return this.hasMany('App/Models/Product')
  }

  users () {
    return this.hasOne('App/Models/User')
  }
}

module.exports = Buy
