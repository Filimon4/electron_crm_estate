import React, { useEffect, useMemo, useState } from 'react'
import { Button, Center, Flex, Heading } from '@chakra-ui/react'
import FormInput from '../../../components/global/FormInput/FormInput'

import styles from './Singin.module.scss'
import { useAtom } from 'jotai'
import { writeUser } from '../../../shared/store'
import { route_pages, updatePage } from '../../../shared/route'

const Signin = () => {
  const [_, setUser] = useAtom(writeUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const validButton = useMemo(() => (!email || !password), [email, password])

  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
  }

  return (
    <Flex direction={'column'}>
      <Heading mb="6" textAlign="center">Авторизация</Heading>
      <form onSubmit={e => onSignin(e)}>
        <FormInput value={email} setValue={setEmail} id='email' inputType='email' name='Почта' />
        <FormInput value={password} setValue={setPassword}  id='password' inputType='password' name='Пароль' />
        <Button type="submit" colorScheme="blue" width="full" mt="4" isDisabled={validButton ? true : false}>Войти</Button>
      </form>
    </Flex>
  )
}

export default Signin
