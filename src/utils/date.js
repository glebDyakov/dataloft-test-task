export default (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short', // Сокращённое название месяца
    year: 'numeric',
  }).format(new Date(date))
}
