const postgresErrorCodes: {
  [k in string]: string
} = {
  '23505': 'Нарушение уникальности.', // Unique violation
  '23503': 'Нарушение внешнего ключа.', // Foreign key violation
  '23502': 'Поле не может быть NULL.', // Not null violation
  '42601': 'Ошибка в синтаксисе SQL.', // Syntax error
  '42P01': 'Таблица не найдена.', // Undefined table
  '42703': 'Колонка не найдена.', // Undefined column
  '42883': 'Функция не найдена.', // Undefined function
  '23514': 'Нарушение CHECK.', // Check violation
  '22001': 'Длина строки превышена.', // String data too long
  '22003': 'Число вне диапазона.', // Numeric value out of range
  '08006': 'Потеряно соединение.', // Connection failure
  '57014': 'Запрос отменён.', // Query canceled
  '53200': 'Недостаточно памяти.', // Out of memory
  '42602': 'Недопустимое имя.', // Invalid name
  '22012': 'Деление на ноль.', // Division by zero
  '40001': 'Ошибка транзакции.', // Serialization failure
  '42P02': 'Неопределённый параметр.', // Undefined parameter
  '22008': 'Неверный формат даты/времени.', // Invalid datetime format
  '22P02': 'Неверный ввод: тип.', // Invalid text representation
  '23504': 'Ограничение FOREIGN KEY не выполнено.', // Foreign key not satisfied
  '08001': 'Ошибка подключения к серверу.', // Unable to connect
  '42611': 'Ошибка ограничения.', // Invalid constraint
};

export function getPostgresErrorMessage(code: string): string {
  return postgresErrorCodes[code] ?? 'Ошибка базы данных.';
}