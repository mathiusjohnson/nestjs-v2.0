import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}
  create(createPostInput: CreatePostInput) {
    return this.postsRepository.createPost(createPostInput);
  }

  findAll() {
    return this.postsRepository.getPosts();
  }

  findOne(id: string) {
    return this.postsRepository.getPost(id);
  }

  updatePost(id: string, updatePostInput: UpdatePostInput) {
    return this.postsRepository.updatePost(id, updatePostInput);
  }

  remove(id: string) {
    return this.postsRepository.removePost(id);
  }
}
