// import {
//   ConflictException,
//   InternalServerErrorException,
//   Logger,
// } from '@nestjs/common';
// import { EntityRepository, Repository } from 'typeorm';
// import { CreatePostInput } from './dto/create-post.input';
// import { Post } from './entities/post.entity';
// import * as bcrypt from 'bcrypt';
// import { UpdatePostInput } from './dto/update-post.input';

// @EntityRepository(Post)
// export class PostsRepository extends Repository<Post> {
//   private logger = new Logger('PostsRepository', true);

//   async createPost(createPostInput: CreatePostInput): Promise<Post> {
//     const { textBody, posterId } = createPostInput;

//     const post = this.create({ textBody, posterId });

//     try {
//       await this.save(post);
//       const savedPost = this.getPost(post.id);
//       return savedPost;
//     } catch (error) {
//       if (error.code === '23505') {
//         throw new ConflictException('Postname already exists');
//       } else {
//         throw new InternalServerErrorException();
//       }
//     }
//   }

//   async getPosts(): Promise<Post[]> {
//     const query = this.createQueryBuilder('post');

//     try {
//       const posts = await query.getMany();
//       return posts;
//     } catch (error) {
//       this.logger.error(`Failed to get posts`, error.stack);
//       throw new InternalServerErrorException();
//     }
//   }

//   async getPost(id: string): Promise<Post> {
//     const query = this.createQueryBuilder('post');

//     try {
//       const post = await query.where('post.posterId = :id', { id }).getOne();
//       console.log(post);

//       return post;
//     } catch (error) {
//       this.logger.error(`Failed to get post`, error.stack);
//       throw new InternalServerErrorException();
//     }
//   }

//   async getUserPosts(posterId: string): Promise<Post[]> {
//     const query = this.createQueryBuilder('post');

//     try {
//       const posts = await query
//         .where('post.posterId = :id', { posterId })
//         .getMany();
//       console.log(posts);

//       return posts;
//     } catch (error) {
//       this.logger.error(`Failed to get post`, error.stack);
//       throw new InternalServerErrorException();
//     }
//   }

//   async updatePost(
//     id: string,
//     updatePostInput: UpdatePostInput,
//   ): Promise<Post> {
//     const { textBody } = updatePostInput;
//     const query = this.createQueryBuilder('post');

//     try {
//       const post = await query.where('post.id = :id', { id }).getOne();
//       post.textBody = textBody;
//       await this.save(post);
//       return post;
//     } catch (error) {
//       this.logger.error(`Failed to update post`, error.stack);
//       throw new InternalServerErrorException();
//     }
//   }

//   async removePost(id: string): Promise<string> {
//     const query = this.createQueryBuilder('post');
//     this.logger.log(id);
//     try {
//       await query.delete().where('id = :id', { id }).execute();
//       return `post with id ${id} has been removed`;
//     } catch (error) {
//       this.logger.error(`Failed to get post`, error.stack);
//       throw new InternalServerErrorException();
//     }
//   }
// }
