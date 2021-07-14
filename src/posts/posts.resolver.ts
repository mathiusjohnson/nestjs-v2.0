import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { Logger, Req, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { Request } from 'express';

import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';

const pubSub = new PubSub();

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
    const logger = new Logger('CreatePostResolver');

    logger.log(`create post hit with ${JSON.stringify(createPostInput)}`);
    const newPost = this.postsService.create(createPostInput);
    pubSub.publish('postAdded', { postAdded: newPost });
    return newPost;
  }

  @Subscription((returns) => Post)
  postAdded() {
    return pubSub.asyncIterator('postAdded');
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
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: Request,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    const logger = new Logger('CreatePostResolver');

    logger.log(`update post hit with ${JSON.stringify(updatePostInput)}`);
    return this.postsService.updatePost(updatePostInput.id, updatePostInput);
  }

  @Subscription((returns) => Post)
  postUpdated() {
    return pubSub.asyncIterator('postUpdated');
  }

  @Mutation((returns) => Post, { name: 'removePost' })
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: Request, @Args('id') id: string) {
    return this.postsService.remove(id);
  }

  @Subscription((returns) => Post)
  postDeleted() {
    return pubSub.asyncIterator('postDeleted');
  }

  @ResolveField((type) => User)
  user(@Parent() post: Post) {
    const logger = new Logger('get userposts in posts resolver');
    const { posterId } = post;
    logger.log(`id in user posts resolver: ${posterId}`);
    return this.postsService.getUserPost(posterId);
  }
}
