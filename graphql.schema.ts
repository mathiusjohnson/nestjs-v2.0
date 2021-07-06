
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Signup {
    username: string;
    email: string;
    password: string;
}

export class CreateUserInput {
    username: string;
    password: string;
}

export class UpdateUserInput {
    id: number;
}

export class SignupResponse {
    username: string;
    email: string;
}

export class AuthPayload {
    email: string;
}

export abstract class IMutation {
    abstract signup(input: Signup): SignupResponse | Promise<SignupResponse>;

    abstract login(username: string, password: string): AuthPayload | Promise<AuthPayload>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): User | Promise<User>;
}

export class User {
    id: string;
    username: string;
    password: string;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: number): User | Promise<User>;
}
