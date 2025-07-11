import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Loader from '../ui/Loader';
import '../../styles/header.css';

const Header = () => {
  const { user, accountInfo, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-top">
          <div className="logo">
            <img
              src="/SCAN-Publications-Finder-React-API-page/images/HomePage/logo.png"
              alt="СКАН логотип"
              width={isMobile ? 111 : 140}
              height={isMobile ? 55 : 80}
            />
          </div>

          {isMobile && user && (
            <div className="mobile-user-info">
              <div className="account-info-mobile">
                {accountInfo && !loading ? (
                  <>
                    <div className="account-row">
                      <span >Использовано компаний </span>
                      <span className="count">{accountInfo.usedCompanyCount}</span>
                    </div>
                    <div className="account-row">
                      <span>Лимит по компаниям</span>
                      <span className="count">{accountInfo.companyLimit}</span>
                    </div>
                  </>
                ) : (
                  <Loader size="small" />
                )}
              </div>

              <div className="user-avatar-mobile">
                <div className="avatar-initials">АА</div>
                <button onClick={logout} className="logout-btn">Выйти</button>
              </div>
            </div>
          )}

          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="/" className="nav-link">Главная</a>
          <a href="/tariffs" className="nav-link">Тарифы</a>
          <a href="/faq" className="nav-link">FAQ</a>

          {isMobile && !user && (
            <div className="mobile-auth-buttons">
              <a href="/register" className="register-btn">Зарегистрироваться</a>
              <a href="/login" className="login-btn">Войти</a>
            </div>
          )}
        </nav>

        {!isMobile && (
          <>
            {user ? (
              <div className="user-panel">
                {accountInfo && !loading ? (
                  <div className="account-info">
                    <div className="account-info-name">
                      <span>Использовано компаний</span>
                      <span className="count-black">{accountInfo.usedCompanyCount}</span></div>
                    <div className="account-info-name">
                      <span>Лимит по компаниям</span>
                      <span className="count-green">{accountInfo.companyLimit}</span></div>
                  </div>
                ) : (
                  <Loader size="small" />
                )}

                <div className="user-avatar">
                  <div className='user-log'>
                    <div className="username">Алексей А.</div>
                    <button onClick={logout} className="logout-btn">Выйти</button>
                  </div>
                  <div className="avatar-initials"> <img
                    src="/images/HomePage/ava.png"
                    alt="СКАН логотип"
                    width={33}
                    height={33}
                  /></div>

                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <a href="/register" className="register-btn">Зарегистрироваться</a>
                <a href="/login" className="login-btn">Войти</a>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;