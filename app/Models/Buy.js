'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Buy extends Model {
  products () {
    return this.hasMany()
  }

  users () {
    return this.belongsTo()
  }
}

module.exports = Buy
