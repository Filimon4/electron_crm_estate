import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React from 'react'

const Signup = () => {
  return (
    <Flex direction={'column'}>
      <Heading mb="6" textAlign="center">Регистрация</Heading>
      <form onSubmit={e => console.log("submit")}>
        <FormControl id="email" mb="4">
          <FormLabel>Имя</FormLabel>
          <Input
            type="text"
          />
          {/* {errors.email && <Text color="red.500">{errors.email.message}</Text>} */}
        </FormControl>

        <FormControl id="password" mb="4">
          <FormLabel>Пароль</FormLabel>
          <Input
            type="password"
          />
          {/* {errors.password && <Text color="red.500">{errors.password.message}</Text>} */}
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full" mt="4">Зарегестрироватся</Button>
      </form>
    </Flex>
  )
}

export default Signup