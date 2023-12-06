import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import type { DecodedJWT, JWT, RefreshedToken, Token } from "next-auth/jwt";
import type { AuthOptions, User, UserObject } from "next-auth";

async function refreshAccessToken(token: JWT): Promise<JWT | null> {
  try {
    const res = await fetch(
      `${process.env.DJANGO_BASE_URL}/api/refresh_token/`,
      {
        method: "POST",
        body: JSON.stringify({ refresh_token: token.refresh_token }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const refreshedToken: RefreshedToken = await res.json();

    if (res.status !== 200) throw refreshedToken;

    const { exp }: DecodedJWT = jwtDecode(refreshedToken.access_token);

    return {
      ...token,
      ...refreshedToken,
      exp,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username_or_email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // console.log(credentials);
        try {
          const res = await fetch(
            `${process.env.DJANGO_BASE_URL}/auth/login/`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );

          const token: Token = await res.json();
          //   console.log(token);
          if (res.status !== 200) throw token;

          const { exp }: DecodedJWT = jwtDecode(token.access_token);

          return {
            ...token,
            exp,
            user: {
              username: token.username,
              user_role: token.user_role,
            },
          } as User;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({ token, user, account }) {
      // initial signin
      if (user && account) {
        return user as JWT;
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.exp * 100) {
        return token;
      }

      // refresh token
      return (await refreshAccessToken(token)) as JWT;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.exp = token.exp;
      session.refresh_token = token.refresh_token;
      session.user = {
        username: token.username,
        user_role: token.user_role,
      } as User;

      return session;
    },
  },
};
