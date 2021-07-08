import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { UsersResolver } from '../users/users.resolver';
import { UsersRepository } from '../users/users.repository';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PostsService } from 'src/posts/posts.service';
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/posts/entities/post.entity';
// import { PostsRepository } from 'src/posts/posts.repository';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([UsersRepository, Post]),
    UsersModule,
    PostsModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    AuthResolver,
    UsersResolver,
    PostsService,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
