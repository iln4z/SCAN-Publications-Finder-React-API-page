import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateINN, validateDates } from '../../utils/validation';
import '../../styles/search.css';

const SearchForm = () => {
  const [formData, setFormData] = useState({
    inn: '',
    maxFullness: false,
    inBusinessNews: false,
    onlyMainRole: false,
    tonality: 'any',
    onlyWithRiskFactors: false,
    excludeTechNews: false,
    excludeAnnouncements: false,
    excludeDigests: false,
    limit: 100,
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({});
  const { search } = useSearch();
  const navigate = useNavigate();

  const formatINN = (value) => {
    const numbers = value.replace(/\D/g, '');

    let formatted = '';
    for (let i = 0; i < numbers.length; i++) {
      if (i === 2 || i === 5 || i === 8) {
        formatted += ' ' + numbers[i];
      } else {
        formatted += numbers[i];
      }
      if (formatted.replace(/\s/g, '').length >= 10) break;
    }

    return formatted.trim();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'inn') {
      const formattedValue = formatINN(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));

      setErrors(prev => ({
        ...prev,
        inn: validateINN(formattedValue.replace(/\s/g, ''))
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));

      if (name === 'startDate' || name === 'endDate') {
        setErrors(prev => ({
          ...prev,
          dates: validateDates(
            name === 'startDate' ? value : formData.startDate,
            name === 'endDate' ? value : formData.endDate
          )
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const innError = validateINN(formData.inn.replace(/\s/g, ''));
    const datesError = validateDates(formData.startDate, formData.endDate);

    if (innError || datesError) {
      setErrors({ inn: innError, dates: datesError });
      return;
    }

    const searchData = {
      ...formData,
      inn: parseInt(formData.inn.replace(/\s/g, ''))
    };

    search(searchData);
    navigate('/results');
  };

  const isFormValid =
    formData.inn.replace(/\s/g, '').length === 10 &&
    !errors.inn &&
    formData.startDate &&
    formData.endDate &&
    !errors.dates &&
    formData.limit >= 1 &&
    formData.limit <= 1000;

  return (
    <div className="search-page-container">
      <div className="search-content">
        <div className="search-form-container">
          <h1>Найдите необходимые данные в пару кликов</h1>
          <p>Задайте параметры поиска. Чем больше заполните, тем точнее поиск</p>

          <form onSubmit={handleSubmit} className="search-form">
            <div className="form-row">
              <div className="form-group">
                <label>ИНН компании *</label>
                <Input
                  type="text"
                  name="inn"
                  value={formData.inn}
                  onChange={handleChange}
                  placeholder="12 345 678 90"
                  maxLength={13}
                  error={errors.inn}
                />
              </div>

              <div className="form-group">
                <label>Тональность</label>
                <select
                  name="tonality"
                  value={formData.tonality}
                  onChange={handleChange}
                  className="select"
                >
                  <option value="any">Любая</option>
                  <option value="positive">Позитивная</option>
                  <option value="negative">Негативная</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Количество документов в выдаче *</label>
              <Input
                type="number"
                name="limit"
                value={formData.limit}
                onChange={handleChange}
                min="1"
                max="1000"
              />
            </div>

            <div className="form-group">
              <label>Диапазон поиска *</label>
              <div className="date-range">
                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.dates && <div className="error">{errors.dates}</div>}
            </div>

            <div className="checkboxes">
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="maxFullness"
                    checked={formData.maxFullness}
                    onChange={handleChange}
                  />
                  Признак максимальной полноты
                </label>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="inBusinessNews"
                    checked={formData.inBusinessNews}
                    onChange={handleChange}
                  />
                  Упоминания в бизнес-контексте
                </label>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="onlyMainRole"
                    checked={formData.onlyMainRole}
                    onChange={handleChange}
                  />
                  Главная роль в публикации
                </label>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="onlyWithRiskFactors"
                    checked={formData.onlyWithRiskFactors}
                    onChange={handleChange}
                  />
                  Публикации только с риск-факторами
                </label>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="excludeTechNews"
                    checked={formData.excludeTechNews}
                    onChange={handleChange}
                  />
                  Включать технические новости рынков
                </label>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="excludeAnnouncements"
                    checked={formData.excludeAnnouncements}
                    onChange={handleChange}
                  />
                  Включать анонсы и календари
                </label>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="excludeDigests"
                    checked={formData.excludeDigests}
                    onChange={handleChange}
                  />
                  Включать сводки новостей
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              fullWidth
            >
              Поиск
            </Button>
          </form>
        </div>
        <div className="search-image">
          <img
            src="/images/HomePage/login.png"
            alt="Иллюстрация поиска"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;