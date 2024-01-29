export class User {
  constructor (
    public name: string,
    public propertyName: string,
    public uf: string,
    public city: string,
    public email: string,
    public cpfCnpj: string,
    public password: string,
    public confirmPassword: string,
    public roles: string[]
  ){}
}
