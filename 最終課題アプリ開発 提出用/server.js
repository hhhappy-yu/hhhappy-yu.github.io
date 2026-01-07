const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let memos = [];

app.post('/memo', (req, res) => {
  let types = req.body.type;
  const memo = req.body.memo;

  if (!Array.isArray(types)) {
    types = [types];
  }

  memos.push({ types, memo });

  res.redirect('/list');
});

// 一覧表示
app.get('/list', (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>連絡メモ一覧（保育士用）</title>
    <style>
      body {
        font-family: sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
      }
      h1 {
        color: #333;
      }
      .memo {
        background-color: #fff;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .types {
        margin-bottom: 8px;
      }
      .type {
        display: inline-block;
        padding: 4px 8px;
        margin-right: 5px;
        border-radius: 4px;
        font-size: 12px;
        color: #fff;
      }
      .体調 { background-color: #e74c3c; }
      .迎え時間 { background-color: #3498db; }
      .欠席 { background-color: #95a5a6; }
      .送迎者変更 { background-color: #f39c12; }
      .持ち物・行事 { background-color: #27ae60; }
      .その他 { background-color: #8e44ad; }

      a {
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        color: #3498db;
      }
    </style>
  </head>
  <body>
    <h1>保育士用 連絡メモ一覧</h1>
  `;

  memos.forEach((m) => {
    html += `
      <div class="memo">
        <div class="types">
          ${m.types.map((t) => `<span class="type ${t}">${t}</span>`).join('')}
        </div>
        <div>${m.memo}</div>
      </div>
    `;
  });

  html += `
    <a href="/">入力画面に戻る</a>
  </body>
  </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`サーバ起動：http://localhost:${PORT}`);
});
