import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    console.log('useDebounce: ', value)
    setDebouncedValue(null)
    const timer = setTimeout(() => {
      setDebouncedValue(value)
      console.log('debounce')
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue
}