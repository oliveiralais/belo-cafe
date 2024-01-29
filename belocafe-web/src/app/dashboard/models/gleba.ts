import { User } from "./user";

export class Gleba {
  constructor(
    public name: string,
    public area: number,
    public horizontalSpacing: number,
    public verticalSpacing: number,
    public plants: number,
    public variety: string,
    public altitude: number,
    public proprietary: User,
    public id?: number,
  ){}
}
