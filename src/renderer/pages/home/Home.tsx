import React from 'react'
import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import Menu from '../../components/menu/Menu'



const Home = () => {

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
    >
      <Menu />
      <Outlet />
    </Flex>
  )
}

export default Home