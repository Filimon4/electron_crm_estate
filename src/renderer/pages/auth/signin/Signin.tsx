import React from 'react'
import { Button, Center, Flex, Heading } from '@chakra-ui/react'
import FormInput from '../../../components/global/FormInput/FormInput'
import LinkHash from '../../../components/routes/LinkHash'

import styles from './Singin.module.scss'
import { useAtom } from 'jotai'
import { writeUser } from '../../../shared/store'
import { route_pages, updatePage } from '../../../shared/route'

const Signin = () => {
  const [_, setUser] = useAtom(writeUser)

  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //@ts-ignore
    const {email, password} = e.target
    //@ts-ignore
    const user = await window.context.signin({
      // email: email.value,
      email: 'f.rykov@bk.ru',
      // password: password.value,
      password: '123123'
    })
    console.log(user)
    if (user) {
      email.value = ''
      password.value = ''
      setUser(user)
      updatePage(route_pages.home)
    }
  }

  return (
    <Flex direction={'column'}>
      <Heading mb="6" textAlign="center">Авторизация</Heading>
      <form onSubmit={e => onSignin(e)}>
        <FormInput id='email' inputType='email' name='Почта' />
        <FormInput id='password' inputType='password' name='Пароль' />
        <Button type="submit" colorScheme="blue" width="full" mt="4">Войти</Button>
      </form>
      <Center paddingTop={'10px'} color={"gray.400"}>Нету аккаунта? <span className={styles.signup_span}><LinkHash to={'signup'}>Зарегестрируй</LinkHash></span></Center>
    </Flex>
  )
}

export default Signin
