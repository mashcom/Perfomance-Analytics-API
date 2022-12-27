import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'outcomes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('action_id')
      table.string('outcome')
      table.integer('boxer_id')
      table.integer('fight_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
