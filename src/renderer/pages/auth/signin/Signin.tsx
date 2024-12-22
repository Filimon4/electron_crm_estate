import React, { useEffect, useMemo, useState } from 'react'
import { Button, Center, Flex, Heading } from '@chakra-ui/react'
import { CustomFormInput } from '../../../components/global/FormInput/FormInput'

import styles from './Singin.module.scss'
import { useAtom } from 'jotai'
import { writeUser } from '../../../shared/store'
import { route_pages, updatePage } from '../../../shared/route'
import { isEmailValid, isPasswordOnly } from '../../../shared/utils/form'

const Signin = () => {
  const [_, setUser] = useAtom(writeUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disableSignin, setDisableSignin] = useState(false)

  const validButton = useMemo(() => (!email || !password || !isEmailValid(email) || !isPasswordOnly(password)), [email, password])

  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisableSignin(true)
    //@ts-ignore
    const user = await window.invokes.signin({
      email: email,
      password: password
    })
    if (user) {
      setUser(user)
      updatePage('home')
      setEmail('')
      setPassword('')
    }
    setDisableSignin(false)
  }

  return (
    <Flex direction={'column'}>
      <Heading mb="6" textAlign="center">Авторизация</Heading>
      <form onSubmit={e => onSignin(e)}>
        <CustomFormInput value={email} setValue={setEmail} id='email' inputType='email' name='Почта' />
        <CustomFormInput regexCheck={isPasswordOnly} value={password} setValue={setPassword}  id='password' inputType='password' name='Пароль' />
        <Button disabled={disableSignin} type="submit" colorScheme="blue" width="full" mt="4" isDisabled={validButton ? true : false}>Войти</Button>
      </form>
    </Flex>
  )
}

export default Signin
