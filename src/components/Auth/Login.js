// src/components/Auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Используем хук для перенаправления

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://25.1.177.222:5000/api/login', {
        username,
        password,
      });

      // Сохраняем JWT токен в localStorage
      localStorage.setItem('token', response.data.token);

      // Перенаправляем пользователя на страницу с задачами
      navigate('/tasks');
    } catch (error) {
      setMessage("Пользователя с таким username и паролем не существует!");
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
