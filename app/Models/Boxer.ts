import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Fight from "App/Models/Fight";

export default class Boxer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public dob: Date;

  @column()
  public weight: number;

  @column()
  public height: number;

  @column()
  public reach: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Fight, { foreignKey: "boxer1" })
  public home_fight: HasMany<typeof Fight>;

  @hasMany(() => Fight, { foreignKey: "boxer2" })
  public away_fight: HasMany<typeof Fight>;

  @column()
  public targets:any;
}
