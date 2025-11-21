'use strict';

const result = document.getElementById('result');

/*** ユーザー登録 ***/
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  // POSTリクエスト
  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const data = await res.json();
    result.textContent = data.message;
  } else {
    result.textContent = res.status + ' ' + res.statusText;
  }
});

/*** ログイン ***/
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  // POSTリクエスト
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  result.textContent = data.message;
});

/*** プロフィールの取得 ***/
const getProfileButton = document.getElementById('getProfileButton');
getProfileButton.addEventListener('click', async (e) => {
  e.preventDefault();

  // GETリクエスト
  const res = await fetch('/api/profile');

  if (res.ok) {
    const data = await res.json();
    result.textContent = 'ログインユーザー：' + data.username;
  } else {
    result.textContent = 'ログインしていません';
  }
});

/*** ログアウト ***/
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', async (e) => {
  e.preventDefault();

  // POSTリスエスト（ボディなし）
  const res = await fetch('/api/logout', { method: 'POST' });

  if (res.ok) {
    result.textContent = 'ログアウトしました';
    loginUser.textContent = '';
  } else {
    result.textContent = 'ログインしていません';
  }
});
