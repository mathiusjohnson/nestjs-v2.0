import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PostsService } from 'src/posts/posts.service';
import { Logger } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User])
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUserName(
      updateUserInput.id,
      updateUserInput,
    );
  }

  @Mutation(() => User)
  remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  // @Resolver('Post')
  // @ResolveField(() => [Post])
  // async getUserPosts(@Parent() user: User) {
  //   const logger = new Logger('user posts resolver');
  //   const { id } = user;
  //   logger.log(`id in user posts resolver: ${id}`);
  //   return this.usersService.getUserPosts(id);
  // }
}
