/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { getModifiedCookieValues } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

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
          redirect_uri: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/kakaoLogin`,
        },
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
    async signIn({ account, ...rest }) {
      console.log('signIn account: ', account);
      console.log('signIn rest: ', rest);
      return true;
    },
    jwt({ token, account, user, ...rest }) {
      const cookies = getModifiedCookieValues('next-auth.session-token');
      console.log('jwt cookies: ', cookies);
      if (account) {
        console.log('jwt account: ', account);
        console.log('jwt user: ', user);
        console.log('jwt token: ', token);
        console.log('jwt rest: ', rest);
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
    session({ session, token, user, ...rest }) {
      console.log('session rest: ', rest);
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
