import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Action from "App/Models/Action";

export default class Info extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Action, { foreignKey: "info_id" })
  public actions: HasMany<typeof Action>;

  fight_details: Object
}
