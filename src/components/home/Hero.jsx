import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import '../../styles/hero.css';

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRequestClick = () => {
    navigate('/search');
  };

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-text">
          <h1>Сервис по поиску публикаций о компании по его ИНН</h1>
          <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
          {user && (
            <Button
              onClick={handleRequestClick}
              className="request-btn"
            >
              Запросить данные
            </Button>
          )}
        </div>
        <div className="hero-image">
          <img className='image-hero'
            src="/SCAN-Publications-Finder-React-API-page/images/HomePage/hero1.png"
            alt="СКАН логотип"
            width={629}
            height={593}
          />

        </div>
      </div>
    </section>
  );
};

export default Hero;