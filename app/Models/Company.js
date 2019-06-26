'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
  users () {
    return this.hasMany('App/Models/User')
  }
  products () {
    return this.hasMany('App/Models/Product')
  }
}

module.exports = Company
