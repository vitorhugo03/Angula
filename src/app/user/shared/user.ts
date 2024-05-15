import { Address } from './address';

export class User extends Address {
  name: string = '';
  dateOfBirth: Date = new Date();
  cpf: string = '';
  email: string = '';
  phoneNumber: string = '';
}
