export const isEmailValid = (email: string) => {
  return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
}

export const isLettersOnly = (value: string) => {
  return (/^[а-яА-я ]*$/.test(value))
}

export const isEnglishEmailOnly = (value: string) => {
  return (/^[a-zA-Z0-9.@]*$/.test(value))
}

export const isNumbersOnly = (value: string) => {
  return (/^\d*$/.test(value))
}

export const isPhoneValid = (value: string) => value.length == 11