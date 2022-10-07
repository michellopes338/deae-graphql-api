
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class UserInput {
    username?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class User {
    id?: Nullable<string>;
    username: string;
    email: string;
    verified_email: boolean;
    role: Role;
}

export abstract class IQuery {
    abstract users(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: UserInput): User | Promise<User>;

    abstract updateUser(id: string, updateUserInput: UserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
