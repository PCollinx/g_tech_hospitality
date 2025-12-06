import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          // Get API URL - use environment variable or default
          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL ||
            (process.env.NODE_ENV === "production"
              ? "https://ktech-api.sydeestack.com/api/v1"
              : "http://localhost:3000/api/v1");

          // API request to validate user
          const response = await axios.post(`${apiUrl}/users/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { accessToken, refreshToken, user } = response.data;

          // If token exists, return an object with the token and user
          if (accessToken) {
            return {
              id: user?._id || user?.id || "",
              accessToken,
              refreshToken,
              user,
            };
          } else {
            return null; // Reject if no token is returned
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error(
              "Login error:",
              error.response?.data || error.message
            );
          }
          return null; // Reject on error
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.user = token.user as any;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // Redirect to custom login page
    signOut: "/login", // Redirect to custom login page after signout
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
