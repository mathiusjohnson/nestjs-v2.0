import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostsModule } from 'src/posts/posts.module';
// import { PostsRepository } from 'src/posts/posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PostsModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
