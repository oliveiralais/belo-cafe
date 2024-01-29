export class User {
  constructor (
    public id: number,
    public name: string,
    public propertyName: string,
    public uf: string,
    public city: string,
    public email: string,
    public cpfCnpj: string,
    public roles: string[]
  ){}
}
