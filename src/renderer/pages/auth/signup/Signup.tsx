import { Button, Center, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

import styles from './Signup.module.scss'
import FormInput from '../../../components/forms/FormInput'
import LinkHash from '../../../components/routes/LinkHash'

const Signup = () => {

  

  return (
    <Flex direction={'column'}>
      <Heading mb="6" textAlign="center">Регистрация</Heading>
      <form onSubmit={e => console.log("submit")}>
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