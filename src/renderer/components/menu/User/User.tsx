import { Box, Link, Text } from '@chakra-ui/react'
import React from 'react'
import LinkHash from '../../routes/LinkHash'

const User = () => {
  return (
    <Box>
      <Text>
        <LinkHash to={'singin'}>Auth</LinkHash>
      </Text>
    </Box>
  )
}

export default User