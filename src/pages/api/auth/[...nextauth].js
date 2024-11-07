/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: '',
      authorization: {
        params: {
          redirect_uri:
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/kakaoLogin` || '',
        },
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        return {
          ...token,
          id_token: account.id_token,
          provider: account.provider,
          account,
          user,
        };
      }
      return token;
    },
    session({ session, token, user }) {
      return {
        ...session,
        id_token: token.id_token,
        provider: token.provider,
        account: token.account,
        user,
      };
    },
  },
};

export default NextAuth(authOptions);
