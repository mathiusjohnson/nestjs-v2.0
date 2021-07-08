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
import { Logger } from '@nestjs/common';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation((returns) => Post, { name: 'createPost' })
  create(@Args('createPostInput') createPostInput: CreatePostInput) {
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

  // @Query(() => [Post], { name: 'getUserPosts' })
  // findUserPosts(id: string) {
  //   return this.postsService.findUserPosts(id);
  // }

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
