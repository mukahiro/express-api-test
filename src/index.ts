import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticateToken, type AuthRequest } from './middleware/auth.js';

dotenv.config();
const app = express();
app.use(express.json());

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || 'default_secret';

// ログインのモック
app.post('/login', (req: AuthRequest, res) => {
  const { username, password } = req.body;

  // 本来はDBにアクセスしてユーザーを認証する
  if (username == "admin" && password == "password") {
    const user = { name: username };
    const accessToken = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // トークン発行
    res.json({ accessToken });
  } else {
    res.json({
      message: 'ログインに失敗しました',
    });
  }
});

// 制限ページ
app.get('/private', authenticateToken, (req: AuthRequest, res) => {
  res.json({
    message: '制限ページにアクセス完了',
    user: req.user
  });
});

// 公開ページ
app.get('/public', (req: AuthRequest, res) => {
  res.json({
    message: '公開されているページにアクセス完了',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});