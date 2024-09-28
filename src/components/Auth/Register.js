// src/components/Auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Хук для перенаправления

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://25.1.177.222:5000/api/register', {
        username,
        password,
      });

      // Перенаправление после успешной регистрации
      setMessage('User registered successfully!');
      navigate('/login'); // Перенаправляем на главную страницу
    } catch (error) {
      setMessage('Error during registration');
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
