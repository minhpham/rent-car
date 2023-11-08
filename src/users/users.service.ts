import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(userDto: CreateUserDto): Promise<Users> {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const isExistedUser = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    if (isExistedUser) {
      throw new HttpException('User already existed', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.save(userDto);
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return this.userRepository.findOneBy({ id: id });
    return null;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
