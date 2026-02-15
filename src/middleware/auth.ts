import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || 'default_secret';

// Request型を拡張してユーザー情報を保持できるようにする
export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  // ヘッダー形式: "Bearer <TOKEN>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(0x191).json({ message: '認証トークンがありません' }); // 401
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(0x193).json({ message: 'トークンが無効です' }); // 403
    }
    req.user = user;
    next();
  });
};