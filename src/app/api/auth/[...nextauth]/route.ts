import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProviders({
      name: "credentials",
      credentials: {
        username_or_email: {},
        password: {},
      },
      async authorize(credentials, req) {
        return null;
      },
    }),
  ],
});

export { handler as Post, handler as GET };
