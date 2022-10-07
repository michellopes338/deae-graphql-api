import { CreateUserInput } from '../dto/create-user.input';

export class User {
  constructor(partial: Partial<CreateUserInput>) {
    Object.assign(this, partial);
  }
}
