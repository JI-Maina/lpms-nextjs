import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

const URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(URL + "/auth/refresh_token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: token?.refresh_token }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const res = await response.json();

    const { exp: expiresIn } = jwtDecode(res.access_token);

    // Ensure that the refreshed token contains all necessary properties
    const refreshedToken: JWT = { ...token, ...res, expiresIn };

    // console.log("Token refreshed");
    return refreshedToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials, req) {
        if (!credentials?.password || !credentials?.username) {
          return null;
        }

        const res = await fetch(URL + "/auth/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          // add expiry time
          const { exp: expiresIn } = jwtDecode(user.access_token);

          return { ...user, expiresIn };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log({ token, user });

      if (user) {
        return { ...token, ...user };
      }

      if (
        token.expiresIn &&
        new Date().getTime() < parseInt(token.expiresIn) * 1000
      ) {
        return token;
      }

      return await refreshToken(token);
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          userRole: token.user_role as string,
        };

        session.accessToken = token.access_token as string;
        session.refreshToken = token.refresh_token as string;
        session.expiresIn = token.expiresIn as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};

// import { jwtDecode } from "jwt-decode";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { DecodedJWT, JWT, RefreshedToken, Token } from "next-auth/jwt";
// import type { AuthOptions, User, UserObject } from "next-auth";

// async function refreshAccessToken(token: JWT): Promise<JWT | null> {
//   try {
//     const res = await fetch(
//       `${process.env.DJANGO_BASE_URL}/auth/refresh_token/`,
//       {
//         method: "POST",
//         body: JSON.stringify({ refresh_token: token.refresh_token }),
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     const refreshedToken: RefreshedToken = await res.json();

//     if (res.status !== 200) throw refreshedToken;

//     const { exp }: DecodedJWT = jwtDecode(refreshedToken.access_token);

//     return {
//       ...token,
//       ...refreshedToken,
//       exp,
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export const authOptions: AuthOptions = {
//   session: { strategy: "jwt" },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         username_or_email: {},
//         password: {},
//       },
//       async authorize(credentials, req) {
//         // console.log(credentials);
//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/auth/login/`,
//             {
//               method: "POST",
//               body: JSON.stringify(credentials),
//               headers: { "Content-Type": "application/json" },
//             }
//           );

//           const token: Token = await res.json();
//           //   console.log(token);
//           if (res.status !== 200) throw token;

//           const { exp, user_id }: DecodedJWT = jwtDecode(token.access_token);

//           return {
//             ...token,
//             exp,
//             user: {
//               user_id,
//               user_role: token.user_role,
//             },
//           } as User;
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl)
//         ? Promise.resolve(url)
//         : Promise.resolve(baseUrl);
//     },
//     async jwt({ token, user, account }) {
//       // initial signin
//       if (user && account) {
//         return user as JWT;
//       }

//       // Return previous token if the access token has not expired
//       if (Date.now() < token.exp * 1000) {
//         return token;
//       }

//       // refresh token
//       return (await refreshAccessToken(token)) as JWT;
//     },
//     async session({ session, token }) {
//       session.access_token = token.access_token;
//       session.exp = token.exp;
//       session.refresh_token = token.refresh_token;
//       session.user = {
//         user_role: token.user_role,
//       } as User;

//       return session;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//     newUser: "/auth/register",
//   },
// };
