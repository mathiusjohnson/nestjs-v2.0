import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.usersRepository.create(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['posts'],
    });
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id, { relations: ['posts'] });
  }

  findUserSignIn(username: string) {
    return this.usersRepository.findOne({ username });
  }

  updateUserName(id: string, updateUserInput: UpdateUserInput) {
    const user: User = this.usersRepository.create(updateUserInput);
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = this.findOne(id);
    if (user) {
      const ret = await this.usersRepository.delete(id);
      if (ret.affected === 1) {
        return user;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
}
