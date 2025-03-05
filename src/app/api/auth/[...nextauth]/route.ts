import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import GithubProvider from "next-auth/providers/github";
import type { User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import authService from "@/app/api/auth/auth";
import HTTPError from "@/types/HTTPError";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: { email: string; password: string } | undefined) {
        try {
          if (!credentials) {
            return null;
          }
          const response = await authService.login(credentials);
          
          if (response && response.access_token) {
            // Decode the JWT token to get user information
            // This is a simplified approach - in production you might want to validate the token
            const tokenParts = response.access_token.split('.');
            if (tokenParts.length === 3) {
              try {
                const payload = JSON.parse(atob(tokenParts[1]));
                
                // Return user object with token information
                return {
                  id: payload.email, // Using email as ID since that's what we have
                  email: payload.email,
                  name: payload.fullname || payload.email,
                  role: payload.role,
                  isRecruiter: payload.role === 'RECRUITER',
                  accessToken: response.access_token,
                  refreshToken: response.refresh_token
                };
              } catch (e) {
                console.error("Failed to parse token:", e);
                throw new Error("Invalid token format");
              }
            }
          }
          return null;
        } catch (error: unknown) {
          const e = error as HTTPError;
          throw new Error(e.response?.data?.detail || "Authentication failed");
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: User }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        token.isRecruiter = user.isRecruiter;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (session?.user) {
        // Pass token data to the client
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isRecruiter = token.isRecruiter;
        session.user.email = token.email;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
});

export { handler as GET, handler as POST }; 