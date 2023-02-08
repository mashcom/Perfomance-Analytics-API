import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Class extends BaseModel {

  @column()
  public name: String;
}
