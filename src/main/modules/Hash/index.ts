import { scryptSync } from "crypto";

export namespace HashPasswordsNamespace {
  export const hashPassword = (password: string) => {
    return scryptSync(password, 'cf74aad2ce94f1885c7c290a82816064', 64).toString('hex')
  }
  export const checkPassword = (password: string, hash: string) => {
    return HashPasswordsNamespace.hashPassword(password) === hash
  }
}