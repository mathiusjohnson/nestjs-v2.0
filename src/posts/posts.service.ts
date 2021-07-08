import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
// import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}
  create(createPostInput: CreatePostInput) {
    return this.postsRepository.save(createPostInput);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
    });
  }

  async getUserPost(id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  async findUserPosts(id: string): Promise<Post[]> {
    return this.postsRepository.find({ posterId: id });
  }

  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOne(id, { relations: ['user'] });
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
