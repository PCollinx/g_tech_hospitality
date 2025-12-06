import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      _id?: string;
      id?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      role?: string;
      [key: string]: any;
    };
  }

  interface User {
    id: string;
    accessToken: string;
    refreshToken?: string;
    user?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: any;
  }
}
