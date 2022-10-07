import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

export class CreateUserInput {
  @Exclude({ toClassOnly: true })
  id: string;

  @Length(8, 64)
  username: string;

  @IsEmail()
  email: string;

  @Exclude()
  verified_email: boolean;

  @Exclude({ toPlainOnly: true })
  @Length(8, 64)
  password: string;

  @Exclude()
  refresh_token: string;

  @Exclude({ toClassOnly: true })
  role: Role;
}
