import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PubSub } from 'graphql-subscriptions';

export const PUB_SUB = 'PUB_SUB';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        context: ({ req }) => ({ req }),
        autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
        typeDefs: [],
        resolvers: [],
        typePaths: ['./**/*.graphql'],
        installSubscriptionHandlers: true,
        definitions: {
          path: join(process.cwd(), 'graphql.schema.ts'),
          outputAs: 'class',
          watch: true,
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: PUB_SUB,
      useFactory: (configService: ConfigService) => new PubSub({}),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
