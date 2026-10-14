import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import * as jose from 'jose';


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
            const params = new URLSearchParams();
            params.append('username', credentials.username);
            params.append('password', credentials.password);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authenticate/login`, 
              params, // data dikirimkan sebagai params
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              }
            );

            const user = res.data;
           
            if (user) {
              const decodedToken = jose.decodeJwt(user.access_token);
              return {
                token: user.access_token,
                username: credentials.username,
                role : decodedToken.role,
                user_id : decodedToken.user_id,

              };
            }
            return null;
          } catch (error) {
            throw new Error(error.response.data.detail);
          }
        }
      })
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.accessToken = user.token;
          token.username = user.username;
          token.role = user.role;
          token.user_id = user.user_id;
        }
        return token;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.user_id = token.user_id; 
        return session;
      }
    },
    secret:  process.env.NEXT_PUBLIC_AUTH_SECRET,
    pages: {
      signIn: '/authenticate/login',
    }
  });

// Export named handler for Next.js API routing
export { handler as GET, handler as POST, handler as PUT, handler as DELETE};