import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = this.userRepository.findAll({
      attributes: ['id', 'email'],
      include: { all: true },
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }
}
