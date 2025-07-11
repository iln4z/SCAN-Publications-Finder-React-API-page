import React from 'react';
import Button from './Button';
import '../../styles/home.css';

const TariffCard = ({ tariff, isCurrent }) => {
  return (
    <div className={`tariff-card ${isCurrent ? 'current' : ''}`}>
      <div
        className="tariff-header"
        style={{ backgroundColor: tariff.color }}
      >
        <div className="tariff-title">
          <h3>{tariff.name}</h3>
          <p>{tariff.description}</p>
        </div>
        <div className="tariff-image">
          <img src={tariff.image} alt={tariff.name} />
        </div>
      </div>



      <div className="tariff-pricing">
        {isCurrent && (
          <div className="tariff-badge" >
            Текущий тариф
          </div>
        )}
        <div className="price-row">
          <span className="current-price">{tariff.price}</span>
          <span className="old-price">{tariff.oldPrice}</span>
        </div>
        {tariff.monthly && (
          <div className="monthly-price">{tariff.monthly}</div>
        )}
      </div>

      <div className="tariff-features">
        <p>В тариф входит:</p>
        <ul>
          {tariff.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <Button
        className={`tariff-button ${isCurrent ? 'current' : ''}`}
        style={{
          backgroundColor: isCurrent ? tariff.color : 'transparent',
          color: isCurrent ? '#fff' : tariff.color,
          border: `2px solid ${tariff.color}`
        }}
      >
        {isCurrent ? 'Перейти в личный кабинет' : 'Подробнее'}
      </Button>
    </div>
  );
};

export default TariffCard;