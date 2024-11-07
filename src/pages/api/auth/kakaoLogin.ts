/* eslint-disable @typescript-eslint/require-await */
import type { NextApiRequest, NextApiResponse } from 'next';

export const revalidate = 60;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const redirectUri = url.origin + url.pathname;

    res.redirect(
      307,
      `/?code=${code}&state=${state}&redirectUri=${redirectUri}`
    );
  } catch (error) {
    res.status(400).json({ error: 'Invalid URL' });
  }
}
