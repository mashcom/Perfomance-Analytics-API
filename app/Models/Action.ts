import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Outcome from "App/Models/Outcome";

export default class Action extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public info_id: number;

  @column()
  public name: string;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Outcome, { localKey:"id", foreignKey: "action_id" })
  public outcomes: HasMany<typeof Outcome>;
}
