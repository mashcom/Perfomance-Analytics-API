import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Boxer from "App/Models/Boxer";

export default class Fight extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public rounds: number;

  @column()
  public boxer1: number;

  @column()
  public boxer2: number;

  @column()
  description: String;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Boxer, { foreignKey: "id",localKey:"boxer1" })
  public boxer: HasOne<typeof Boxer>;

  @hasOne(() => Boxer, { foreignKey: "id",localKey:"boxer2" })
  public opponent: HasOne<typeof Boxer>;


  @column()
  public total:any;
}
