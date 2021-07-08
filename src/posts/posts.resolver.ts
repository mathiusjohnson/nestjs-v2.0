import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Resolver('Post')
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

  @Mutation((returns) => Post, { name: 'updatePost' })
  update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.updatePost(updatePostInput.id, updatePostInput);
  }

  @Mutation((returns) => Post, { name: 'removePost' })
  remove(@Args('id') id: string) {
    return this.postsService.remove(id);
  }
}
