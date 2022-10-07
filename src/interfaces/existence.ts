import { CreateUserInput } from '../users/dto/create-user.input';

export interface CheckExistance {
  where: Partial<CreateUserInput>;
  message: string;
  expect: boolean;
}
