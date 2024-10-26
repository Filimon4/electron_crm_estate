import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import house from "../../public/icons/house.png"

const Logo = () => {
  return (
    <Flex mb={8} alignItems={'center'} justifyContent={'center'} paddingTop={'20px'}>
      {/* <Image src={house} boxSize='50px' /> */}
      <Text>CRM система</Text>
    </Flex>
  )
}

export default Logo