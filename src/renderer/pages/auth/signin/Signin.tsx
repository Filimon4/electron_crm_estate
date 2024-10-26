import React from 'react'
import { Button, Center, Flex, Heading } from '@chakra-ui/react'
import FormInput from '../../../components/forms/FormInput'
import LinkHash from '../../../components/routes/LinkHash'

import styles from './Singin.module.scss'

const Signin = () => {
  return (
    <Flex direction={'column'}>
      <Heading mb="6" textAlign="center">Авторизация</Heading>
      <form onSubmit={e => console.log('submit')}>
        <FormInput id='email' inputType='email' name='Почта' />
        <FormInput id='password' inputType='password' name='Пароль' />
        <Button type="submit" colorScheme="blue" width="full" mt="4">Войти</Button>
      </form>
      <Center paddingTop={'10px'} color={"gray.400"}>Нету аккаунта? <span className={styles.signup_span}><LinkHash to={'signup'}>Зарегестрируй</LinkHash></span></Center>
    </Flex>
  )
}

export default Signin
