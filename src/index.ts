import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticateToken, type AuthRequest } from './middleware/auth.js';

dotenv.config();
const app = express();
app.use(express.json());

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || 'default_secret';

// ログインのモック
app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = { name: username };
  const accessToken = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // トークン発行
  res.json({ accessToken });
});

// 保護されたルート
app.get('/me', authenticateToken, (req: AuthRequest, res) => {
  res.json({
    message: '認証に成功しました',
    user: req.user
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});