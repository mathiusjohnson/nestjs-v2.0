import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @Field()
  enabled: boolean;

  @Field()
  lastSeenAt: Date;
}
@ObjectType()
export class AuthPayload {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  token: string;

  @Field()
  expiration: number;

  @Field()
  user: User;
}
