
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AuthCredentialsDto {
    username: string;
    password: string;
}

export class CreateUserInput {
    username: string;
    password: string;
}

export class UpdateUserInput {
    id: string;
    username: string;
}

export class CreatePostInput {
    text_body: string;
    poster_id: string;
}

export class UpdatePostInput {
    id: string;
    text_body: string;
}

export class User {
    id: string;
    username: string;
    password: string;
}

export class Post {
    id: string;
    text_body: string;
    poster_id: string;
}

export abstract class IQuery {
    abstract findAll(): User[] | Promise<User[]>;

    abstract findOne(id: string): User | Promise<User>;

    abstract getAllPosts(): Post[] | Promise<Post[]>;

    abstract getPostById(id: string): Post | Promise<Post>;
}

export abstract class IMutation {
    abstract signup(input: AuthCredentialsDto): User | Promise<User>;

    abstract login(input: AuthCredentialsDto): User | Promise<User>;

    abstract create(createUserInput: CreateUserInput): User | Promise<User>;

    abstract update(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract remove(id: string): User | Promise<User>;

    abstract createPost(createPostInput: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;

    abstract removePost(id: string): Post | Promise<Post>;
}
