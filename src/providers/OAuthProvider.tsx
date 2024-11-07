import { useOAuthSignIn } from '@/queries/auth.queries';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function OAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { oAuthLogin } = useOAuthSignIn();
  const router = useRouter();

  const params = useSearchParams();

  useEffect(() => {
    if (session?.provider?.toUpperCase() === 'GOOGLE') {
      if (session.id_token) {
        oAuthLogin({
          provider: session.provider.toUpperCase(),
          data: {
            token: session.id_token,
            redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
          },
        });
      }
    }
  }, [
    session?.provider,
    session?.id_token,
    session?.state,
    oAuthLogin,
    session,
    params,
  ]);

  useEffect(() => {
    if (params.get('code') && params.get('redirectUri')) {
      oAuthLogin({
        provider: 'KAKAO',
        data: {
          token: params.get('code')!,
          redirectUri: params.get('redirectUri')!,
        },
      });
      router.replace('/');
    }
  }, [params, oAuthLogin, router]);

  return children;
}
