import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private postsService: PostsService,
  ) {}
  create(createUserInput: CreateUserInput) {
    return this.usersRepository.createUser(createUserInput);
  }

  findAll() {
    return this.usersRepository.getUsers();
  }

  findOne(id: string) {
    return this.usersRepository.getUser(id);
  }

  updateUserName(id: string, updateUserInput: UpdateUserInput) {
    return this.usersRepository.updateUserName(id, updateUserInput);
  }

  remove(id: string) {
    return this.usersRepository.removeUser(id);
  }

  // getUserPosts(id: string): Promise<Post[]> {
  //   return this.postsService.findUserPosts({ poster_id: id });
  // }
}
