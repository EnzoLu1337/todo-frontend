// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Добро пожаловать в To-do приложение!</h1>
      <p style={styles.description}>
        Это приложение поможет вам управлять вашими задачами и повышать продуктивность.
      </p>
      <p style={styles.description}>
        Чтобы начать, пожалуйста, зарегистрируйтесь или войдите в свою учетную запись.
      </p>
      <div style={styles.buttonContainer}>
        <a href="/register" style={styles.button}>Регистрация</a>
        <a href="/login" style={styles.button}>Вход</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '20px auto',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

export default Home;
