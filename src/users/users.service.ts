import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { username, password } = createUserInput;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
      const savedUser = this.findOne(user.id);
      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
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
