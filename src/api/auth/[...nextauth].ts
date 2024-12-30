import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // Sign in with passwordless email link
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: "<no-reply@example.com>",
    }),
  ],
})