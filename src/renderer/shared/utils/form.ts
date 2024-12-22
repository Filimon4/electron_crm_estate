export const isEmailValid = (email: string) => {
  return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
}

export const isLettersOnly = (value: string) => {
  return (/^[а-яА-Яё ]*$/.test(value))
}

export const isEnglishEmailOnly = (value: string) => {
  return (/^[a-zA-Z0-9.@]*$/.test(value))
}

export const isNumbersOnly = (value: string) => {
  return (/^\d*$/.test(value))
}

export const isPasswordOnly = (value: string) => {
  return (/^[A-Za-z0-9_! ]+$/.test(value) || value.length == 0)
}

export const isPhoneValid = (value: string) => value.length == 11