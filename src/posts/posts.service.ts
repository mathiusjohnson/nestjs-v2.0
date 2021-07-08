import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
// import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}
  create(createPostInput: CreatePostInput) {
    return this.postsRepository.create(createPostInput);
  }

  findAll() {
    return this.postsRepository.find({
      relations: ['users'],
    });
  }

  // findUserPosts(poster_id: any) {
  //   return this, this.postsRepository.getUserPosts(poster_id);
  // }

  findOne(id: string) {
    return this.postsRepository.findOne(id, { relations: ['users'] });
  }

  updatePost(id: string, updatePostInput: UpdatePostInput) {
    const post: Post = this.postsRepository.create(updatePostInput);
    post.id = id;
    return this.postsRepository.save(post);
  }

  async remove(id: string) {
    const post = this.findOne(id);
    if (post) {
      const ret = await this.postsRepository.delete(id);
      if (ret.affected === 1) {
        return post;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
}
