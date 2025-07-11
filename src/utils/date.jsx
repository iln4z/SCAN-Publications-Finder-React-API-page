export const formatDate = (date) => {
  const d = new Date(date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return d.toLocaleDateString('ru-RU', options);
};

export const toApiDateFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isValidDate = (dateString) => {
  return !isNaN(Date.parse(dateString));
};


export const isFutureDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date > today;
};