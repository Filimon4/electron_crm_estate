import { Button, Center, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

import styles from './Signup.module.scss'
import FormInput from '../../../components/global/FormInput/FormInput'
import LinkHash from '../../../components/routes/LinkHash'
import { useAtom } from 'jotai'
import { writeUser } from '../../../shared/store'
import { route_pages, updatePage } from '../../../shared/route'

const Signup = () => {
  const [_, setUser] = useAtom(writeUser)
  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //@ts-ignore
    //TODO: добавить проверки
    const {firstName, secondName, lastName, phone, email, password} = e.target
    //@ts-ignore
    const user = await window.context.signup({
      firstName: firstName.value,
      secondName: secondName.value,
      lastName: lastName.value,
      phone: phone.value,
      email: email.value,
      password: password.value
    })
    if (user) {
      firstName.value = ''
      secondName.value = ''
      lastName.value = ''
      phone.value = ''
      email.value = ''
      password.value = ''
      setUser(user)
      // updatePage(route_pages.home)
    }
  }

  return (
    <Flex direction={'column'}>
      <Heading mb="6" textAlign="center">Регистрация</Heading>
      <form onSubmit={(e) => onSignup(e)}>
        <Grid
          templateAreas={`
            "first phone"
            "second email"
            "last pass"
          `}
          templateColumns={'repeat(2, 1fr)'}
          templateRows={'repeat(3, 1fr)'}
          gap={'20px'}
        >
          <GridItem area={'first'}>
            <FormInput id='firstName' inputType='text' name='Имя'/>
          </GridItem>
          <GridItem area={'second'}>
            <FormInput id='secondName' inputType='text' name='Фамилия'/>
          </GridItem>
          <GridItem area={'last'}>
            <FormInput id='lastName' inputType='text' name='Отчество'/>
          </GridItem>
          <GridItem area={'phone'}>
            <FormInput id='phone' inputType='text' name='Телефон'/>
          </GridItem>
          <GridItem area={'email'}>
            <FormInput id='email' inputType='email' name='Почта'/>
          </GridItem>
          <GridItem area={'pass'}>
            <FormInput id='password' inputType='password' name='Пароль'/>
          </GridItem>
        </Grid>
        <Button type="submit" colorScheme="blue" width="full" mt="4">Зарегестрироватся</Button>
      </form>
      <Center paddingTop={'10px'} color={"gray.400"}>Уже есть аккаунт? <span className={styles.signin_span}><LinkHash to={'singin'}>Войди</LinkHash></span></Center>
    </Flex>
  )
}

export default Signup