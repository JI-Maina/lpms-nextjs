import type { Token } from "next-auth/jwt";
import type { User, UserObject } from "next-auth";

declare module "next-auth" {
  export interface UserObject {
    user_id: string;
    username: string;
    user_role: string;
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  export interface User extends Token {
    exp: number;
    user: UserObject;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session extends User {
    expires: string;
  }
}

declare module "next-auth/jwt" {
  export interface RefreshedToken {
    access_token: string;
  }
  export interface Token extends RefreshedToken {
    refresh_token: string;
    username: string;
    user_role: string;
  }
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  export interface JWT extends User {
    iat: number;
    jti: string;
  }
  export interface DecodedJWT extends UserObject {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: string;
  }
}
