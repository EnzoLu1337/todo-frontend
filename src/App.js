// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home'; // Стартовая страница
import UserTasks from './components/Todo/TodoList'; // Страница с задачами пользователя

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<UserTasks />} /> {/* Добавляем маршрут для задач */}
      </Routes>
    </Router>
  );
}

export default App;
