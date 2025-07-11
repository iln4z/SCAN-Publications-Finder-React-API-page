import React, { useState } from 'react';
import '../../styles/whyus.css';

const WhyUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const cards = [
    {
      title: 'Высокая и оперативная скорость обработки заявки',
      image: '/images/HomePage/carousel1.png'
    },
    {
      title: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
      image: '/images/HomePage/carousel2.png'
    },
    {
      title: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
      image: '/images/HomePage/carousel3.png'
    },
    {
      title: 'Высокая и оперативная скорость обработки заявки',
      image: '/images/HomePage/carousel1.png'
    },
    {
      title: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
      image: '/images/HomePage/carousel2.png'
    },
    {
      title: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
      image: '/images/HomePage/carousel3.png'
    }
  ];
  const visibleCards = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % cards.length;
    visibleCards.push(cards[index]);
  }
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section className="whyus-section">
      <div className="container">
        <h2 className="section-title">Почему именно мы</h2>

        <div className="whyus-carousel">
          <button className="carousel-arrow prev" onClick={prevSlide}>
            &lt;
          </button>

          <div className="carousel-cards">
            {visibleCards.map((card, index) => (
              <div key={index} className="carousel-card">
                <img
                  src={card.image}
                  alt={card.title}
                  className="whyus-image"
                  width={64}
                  height={64}
                />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          <button className="carousel-arrow next" onClick={nextSlide}>
            &gt;
          </button>
        </div>
        <img className='hero-after'
          src="/images/HomePage/hero2.png"
          alt="СКАН логотип"
          width={1307}
          height={575}
        />

      </div>
    </section>
  );
};

export default WhyUs;