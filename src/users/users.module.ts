import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PostsService } from 'src/posts/posts.service';
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/posts/entities/post.entity';
// import { PostsRepository } from 'src/posts/posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, Post]), PostsModule],
  providers: [UsersResolver, UsersService, PostsService],
  controllers: [UsersController],
})
export class UsersModule {}
