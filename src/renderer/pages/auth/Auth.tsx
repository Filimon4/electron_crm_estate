import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './Auth.module.scss'
import { Box } from '@chakra-ui/react'

const Auth = () => {
  return (
    <>
      <Box w={"100vw"} h={"100vh"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Outlet />
      </Box>
    </>
  )
}

export default Auth