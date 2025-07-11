import React from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import '../styles/login-page.css';

const LoginPage = () => {
  return (
    <Layout>
      <div className="login-page-container">
        <div className="login-content-block">
          <div className="login-text-block">
            <h2>Для оформления подписки на тариф, необходимо авторизоваться.</h2>
          </div>

          <div className="login-form-block">
            <LoginForm />
          </div>

          <div className="login-image-block">
            <img
              src="/images/HomePage/password.png"
              alt="Подписка на тариф"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;