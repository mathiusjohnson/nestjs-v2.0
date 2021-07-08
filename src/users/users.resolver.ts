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
import { Post } from 'src/posts/entities/post.entity';
import { Logger } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getAllUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'getUserById' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUserName(
      updateUserInput.id,
      updateUserInput,
    );
  }

  @Mutation(() => User, { name: 'removeUser' })
  remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @ResolveField((type) => Post)
  user(@Parent() user: User) {
    const logger = new Logger('get userposts in posts resolver');
    const { id } = user;
    logger.log(`id in user posts resolver: ${id}`);
    return this.usersService.findOne(id);
  }
}
