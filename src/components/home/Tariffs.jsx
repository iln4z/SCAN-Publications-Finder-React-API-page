import React from 'react';
import { useAuth } from '../../context/AuthContext';
import TariffCard from '../ui/TariffCard';
import '../../styles/home.css';

const Tariffs = () => {
  const { user } = useAuth();

  const tariffs = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'Для небольшого исследования',
      image: '/SCAN-Publications-Finder-React-API-page/images/HomePage/tarif1.png',
      price: '799 ₽',
      oldPrice: '1 200 ₽',
      monthly: '150 ₽/мес. при рассрочке на 24 мес.',
      features: [
        'Безлимитная история запросов',
        'Безопасная сделка',
        'Поддержка 24/7',
      ],
      current: user?.tariff === 'beginner',
      color: '#FFB64F',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Для HR и фрилансеров',
      image: '/SCAN-Publications-Finder-React-API-page/images/HomePage/tarif2.png',
      price: '1 299 ₽',
      oldPrice: '2 600 ₽',
      monthly: '279 ₽/мес. при рассрочке на 24 мес.',
      features: [
        'Все пункты тарифа Beginner',
        'Экспорт истории',
        'Рекомендации по приоритетам'
      ],
      current: user?.tariff === 'pro',
      color: '#7CE3E1',
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Для корпоративных клиентов',
      image: '/SCAN-Publications-Finder-React-API-page/images/HomePage/tarif3.png',
      price: '2 379 ₽',
      oldPrice: '3 700 ₽',
      features: [
        'Все пункты тарифа Pro',
        'Безлимитное количество запросов',
        'Приоритетная поддержка'
      ],
      current: user?.tariff === 'business',
      color: '#000000',
    }
  ];

  return (
    <div className="tariffs-section">
      <div className="container">
        <h2 className='tarif-h2'>Наши тарифы</h2>
        <div className="tariffs-grid">
          {tariffs.map(tariff => (
            <TariffCard
              key={tariff.id}
              tariff={tariff}
              isCurrent={tariff.current}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tariffs;