import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';

const Login = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post('http://localhost:3000/api/login', {
        userName,
        password,
      });
      router.push('/admin');
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}> Login dashboard</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Admin username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Admin password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.btn} onClick={handleClick}>
          Login
        </button>
        {error && <span className={styles.error}>Wrong Credentiels</span>}
      </div>
    </div>
  );
};

export default Login;
