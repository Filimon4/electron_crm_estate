export const months: { [key: string]: string } = {
  '01': 'Январь',
  '02': 'Февраль',
  '03': 'Март',
  '04': 'Апрель',
  '05': 'Май',
  '06': 'Июнь',
  '07': 'Июль',
  '08': 'Август',
  '09': 'Сентябрь',
  '10': 'Октябрь',
  '11': 'Ноябрь',
  '12': 'Декабрь',
};

// Функция для получения названия месяца по дате
export const getMonthNameFromDate = (date: Date): string => {
  const month = date.toISOString().split('-')[1]; // Получаем месяц из объекта Date
  return months[month] || 'Неизвестный месяц'; // Возвращаем название месяца или сообщение об ошибке
};

export const getRussianDateFromatFromDate = (date: Date): string => {
  return `${date.getDay()}.${date.toISOString().split('-')[1]}.${date.getFullYear()}`
}