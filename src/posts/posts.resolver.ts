import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Logger, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { Request } from 'express';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation((returns) => Post, { name: 'createPost' })
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: Request,
    // @GetUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postsService.create(createPostInput);
  }

  @Query((returns) => [Post], { name: 'getAllPosts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query((returns) => Post, { name: 'getPostById' })
  findOne(@Args('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post], { name: 'getUserPosts' })
  findUserPosts(id: string) {
    return this.postsService.findUserPosts(id);
  }

  @Mutation((returns) => Post, { name: 'updatePost' })
  update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.updatePost(updatePostInput.id, updatePostInput);
  }

  @Mutation((returns) => Post, { name: 'removePost' })
  remove(@Args('id') id: string) {
    return this.postsService.remove(id);
  }

  @ResolveField((type) => User)
  user(@Parent() post: Post) {
    const logger = new Logger('get userposts in posts resolver');
    const { posterId } = post;
    logger.log(`id in user posts resolver: ${posterId}`);
    return this.postsService.getUserPost(posterId);
  }
}
