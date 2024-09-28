// src/components/UserTasks.js
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";


const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState(new Date());

  // Получение задач с бэкенда
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://25.1.177.222:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
      }
    };

    fetchTasks();
  }, []);

  // Добавление новой задачи
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
  
    try {
      const response = await axios.post(
        'http://25.1.177.222:5000/api/tasks',
        { name: newTask, endDate: newDate }, // Add endDate property to the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks([...tasks, response.data]); // Add the new task to the state
      setNewTask(''); // Clear the input field
      setNewDate(new Date()); // Reset the newDate state
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  // Удаление задачи
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://25.1.177.222:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id)); // Удаляем задачу из состояния
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  // Изменение статуса задачи
  const handleToggleStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://25.1.177.222:5000/api/tasks/${id}`,
        { completed: !status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, completed: response.data.completed } : task))
      );
    } catch (error) {
      console.error('Ошибка при изменении статуса задачи:', error);
    }
  };

  return (
    <div>
      <h1>Ваши задачи</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача"
        />
        <DatePicker selected={newDate} onChange={(date) => setNewDate(date)} dateFormat="dd/MM/yyyy"/>
        <button type="submit">Добавить</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.name}
            </span>
            <label for="date">    |   Конечная дата выполнения: {task.end_date}</label>
            <button onClick={() => handleToggleStatus(task.id, task.completed)}>
              {task.completed ? 'Не выполнена' : 'Выполнена'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div> 
  );
};

export default UserTasks;
