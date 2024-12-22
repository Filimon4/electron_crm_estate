

export const tableMaxField = (value: string) => {
  return value.length >= 30 ? `${value.slice(0, 30)}...` : value 
}
