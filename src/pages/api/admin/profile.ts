import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../../lib/auth';

let adminProfile = { profile_pic: '/default.png' };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = authenticate(req, res);
  if (!auth) return;

  if (req.method === 'GET') {
    return res.status(200).json(adminProfile);
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
