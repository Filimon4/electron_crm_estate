import { EventInput } from "@fullcalendar/core";
import { isWithinInterval } from 'date-fns';

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

// Функция для фильтрации событий за сегодня
export const filterEventsToday = (events: EventInput[]): EventInput[] => {
  return events.filter(event => {
    const startDate = event.start as Date | string | number; // Преобразуем start в дату
    const endDate = event.end as Date | string | number; // Преобразуем end в дату
    return isWithinInterval(new Date(), {
      start: startDate,
      end: endDate,
    });
  }).sort((a, b) => Number(a.id) - Number(b.id));
};