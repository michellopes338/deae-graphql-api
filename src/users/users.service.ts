import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PrismaClientService } from '../prisma-client';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryLimit } from '../interfaces/query-limit';
import { UpdateUserInterface } from './interfaces/update-user';
import { CheckExistance } from 'src/interfaces/existence';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClientService) {}

  private async checkExistance(existance: CheckExistance): Promise<void> {
    const isExistent = await this.prisma.users.findFirst({
      where: existance.where,
    });
    if (!!isExistent === existance.expect)
      throw new BadRequestException(existance.message);
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    await this.checkExistance({
      expect: true,
      message: 'usuario já existe',
      where: {
        username: createUserInput.username,
        email: createUserInput.email,
      },
    });
    const { password, ...userData } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.prisma.users.create({
      data: { ...userData, password: hashedPassword },
    });

    return new User(user);
  }

  async findAll({ limit = 20, offset = 0 }: QueryLimit): Promise<User[]> {
    const users = await this.prisma.users.findMany({
      skip: offset,
      take: limit,
    });

    return users.map((user) => new User(user));
  }

  async findOne(id: string): Promise<User> {
    await this.checkExistance({
      expect: false,
      message: 'usuario não existe',
      where: { id },
    });
    const user = await this.prisma.users.findFirst({ where: { id } });
    return new User(user);
  }

  async update(updateData: UpdateUserInterface): Promise<User> {
    await this.checkExistance({
      expect: false,
      message: 'usuario não existe',
      where: { id: updateData.id },
    });
    const user = await this.prisma.users.update({
      where: { id: updateData.id },
      data: updateData.newData,
    });

    return new User(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.prisma.users.delete({ where: { id } });
    return new User(user);
  }
}
