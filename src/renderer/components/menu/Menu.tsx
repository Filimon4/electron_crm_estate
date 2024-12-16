import { Flex } from '@chakra-ui/react'
import React from 'react'
import TaskBar from './TaskBar/TaskBar'
import Logo from './Logo/Logo'
import User from './User/User'

const Menu = () => {
  return (
    <Flex
      position={'sticky'}
      top={'0'}
      direction="column"
      // height="100vh"
      width="200px"
      backgroundColor="gray.400"
      color="white"
      justifyContent={'space-between'}
      maxWidth={"200px"}
      minWidth={"200px"}
    >
      <Logo />
      <TaskBar />
      <User />
    </Flex>
  )
}

export default Menu