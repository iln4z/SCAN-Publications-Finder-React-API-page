export const validateINN = (inn) => {
  const cleanInn = inn.replace(/\s/g, '');
  
  if (!cleanInn) return 'Введите ИНН';
  if (!/^\d+$/.test(cleanInn)) return 'ИНН должен содержать только цифры';
  if (cleanInn.length !== 10) return 'ИНН должен состоять из 10 цифр';
  
  const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanInn[i]) * coefficients[i];
  }
  
  const checkDigit = sum % 11 % 10;
  
  if (parseInt(cleanInn[9]) !== checkDigit) {
    return 'Неверный ИНН';
  }
  
  return null;
};

export const validateDates = (startDate, endDate) => {
  if (!startDate || !endDate) return 'Укажите обе даты';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  
  if (start > today) return 'Дата начала не может быть в будущем';
  if (end > today) return 'Дата окончания не может быть в будущем';
  if (start > end) return 'Дата начала не может быть позже даты окончания';
  
  return null;
};

export const formatINN = (inn) => {
  if (!inn) return '';
  const cleanInn = inn.replace(/\D/g, '');
  
  let formatted = '';
  for (let i = 0; i < cleanInn.length; i++) {
    if (i === 2 || i === 5 || i === 8) {
      formatted += ' ';
    }
    formatted += cleanInn[i];
    if (formatted.replace(/\s/g, '').length >= 10) break;
  }
  
  return formatted.trim();
};