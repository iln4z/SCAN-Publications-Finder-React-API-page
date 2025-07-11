import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import '../../styles/auth.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.login || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    const success = await login(formData);
    if (success) {
      navigate('/');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Войти</h2>
          <p>Зарегистрироваться</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Логин или номер телефона:"
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="Введите логин"
          />

          <Input
            label="Пароль:"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
          />

          {error && <div className="error-message">{error}</div>}

          <Button
            type="submit"
            disabled={!formData.login || !formData.password}
            fullWidth
          >
            Войти
          </Button>

          <a href="/restore" className="restore-link">Восстановить пароль</a>

          <div className="social-login">
            <p>Войти через:</p>
            <div className="social-buttons">
              <button type="button" className="social-btn google"><img 
        src="/images/HomePage/google.png" 
        alt="Войти через Google"
        width={59}
        height={20}
      /></button>
              <button type="button" className="social-btn facebook"><img 
        src="/images/HomePage/facebook.png" 
        alt="Войти через Facebook"
        width={59}
        height={12}
      /></button>
              <button type="button" className="social-btn yandex"><img 
        src="/images/HomePage/yandex.png" 
        alt="Войти через Facebook"
        width={56}
        height={16}
      /></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;