import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fights'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('rounds')
      table.integer('duration')
      table.integer('boxer1')
      table.integer('boxer2')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
