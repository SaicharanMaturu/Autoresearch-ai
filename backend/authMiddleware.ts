import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from './auth';

export function requireAuth(req: Request & { user?: any }, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization as string | undefined;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
    const token = auth.replace('Bearer ', '');
    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (e: any) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = payload;
    next();
  } catch (err: any) {
    res.status(500).json({ error: 'Auth middleware error: ' + err.message });
  }
}
