import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function OAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.provider?.toUpperCase() === 'GOOGLE') {
      if (session.id_token) {
        // oAuthSignIn({
        //   provider: 'GOOGLE',
        //   data: {
        //     token: session.id_token,
        //     state:
        //       // eslint-disable-next-line max-len
        //       'cEtkV7XKBQ7yaiTmq12nlZzB
        // 1uN5T909yiPBXVcTMg4&code=4%2F0AVG7fiQzrW
        // gqWbCEVRsrRtmim8YQP7JriGSVVFfVZWTpA4O9iKAtsrcdjnIlkoXvULm73w',
        //     redirectUri: 'http://localhost:3000/',
        //   },
        // });
        console.log('here: ', session.id_token);
        console.log('here: ', session.provider);
        console.log('here: ', session.state);
        console.log('here: ', session);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.provider, session?.id_token, session?.state]);

  return children;
}
