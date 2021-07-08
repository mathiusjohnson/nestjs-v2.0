/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Signup {
  username: string;
  password: string;
}

export class Login {
  username: string;
  password: string;
}

export class CreatePostInput {
  text_body: string;
  poster_id: string;
}

export class UpdatePostInput {
  id: string;
  text_body: string;
}

export class CreateUserInput {
  username: string;
  password: string;
}

export class UpdateUserInput {
  id: string;
  username: string;
}

export class SignupResponse {
  token?: string;
  username: string;
  password: string;
}

export class AuthPayload {
  token?: string;
  username: string;
}

export abstract class IMutation {
  abstract signup(input: Signup): SignupResponse | Promise<SignupResponse>;

  abstract login(input: Login): AuthPayload | Promise<AuthPayload>;

  abstract createPost(createPostInput: CreatePostInput): Post | Promise<Post>;

  abstract updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;

  abstract removePost(id: string): Post | Promise<Post>;

  abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

  abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

  abstract removeUser(id: string): User | Promise<User>;
}

export class Post {
  id: string;
  text_body: string;
  poster_id: string;
}

export abstract class IQuery {
  abstract posts(): Post[] | Promise<Post[]>;

  abstract post(id: string): Post | Promise<Post>;

  abstract users(): User[] | Promise<User[]>;

  abstract user(id: string): User | Promise<User>;
}

export class User {
  id: string;
  username: string;
  password: string;
}
