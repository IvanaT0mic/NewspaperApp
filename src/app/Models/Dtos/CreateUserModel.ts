import { UpdateUserModel } from './UpdateUserModel';

export class CreateUserModel extends UpdateUserModel {
  username: string;
  password: string;
}
