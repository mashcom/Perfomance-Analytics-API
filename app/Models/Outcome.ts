import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Action from "App/Models/Action";
import Boxer from "App/Models/Boxer";
import Target from "App/Models/Target";

export default class Outcome extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public action_id: number;

  @column()
  public outcome: string;

  @column()
  public boxer_id: number;

  @column()
  public fight_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  round: number;

  @column()
  target_id: number;

  @hasOne(() => Action, { localKey: "action_id", foreignKey: "id" })
  public action_details: HasOne<typeof Action>;

  @hasOne(() => Boxer, { localKey: "boxer_id", foreignKey: "id" })
  public boxer: HasOne<typeof Boxer>;

  @hasOne(() => Target, { localKey: "target_id", foreignKey: "id" })
  public target: HasOne<typeof Target>;

}
