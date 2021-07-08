
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    username: string;
    password: string;
}

export class UpdateUserInput {
    id: string;
    username: string;
}

export class CreatePostInput {
    textBody: string;
    posterId: string;
}

export class UpdatePostInput {
    id: string;
    textBody: string;
}

export class User {
    id: string;
    username: string;
    password: string;
    posts?: Post[];
    user: Post;
}

export class Post {
    id: string;
    textBody: string;
    posterId: string;
    user: User;
}

export abstract class IQuery {
    abstract getAllUsers(): User[] | Promise<User[]>;

    abstract getUserById(id: string): User | Promise<User>;

    abstract getAllPosts(): Post[] | Promise<Post[]>;

    abstract getPostById(id: string): Post | Promise<Post>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): User | Promise<User>;

    abstract createPost(createPostInput: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;

    abstract removePost(id: string): Post | Promise<Post>;
}
