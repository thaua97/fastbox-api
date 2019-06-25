'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BuySchema extends Schema {
  up () {
    this.create('buys', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('buys')
  }
}

module.exports = BuySchema
