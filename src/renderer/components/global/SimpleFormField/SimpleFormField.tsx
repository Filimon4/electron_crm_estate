import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const SimpleFormField = ({heading, text}: {heading: string, text: string}) => {
  return (
    <Flex justify={'space-between'} >
      <Heading size='xs' textTransform='uppercase'>
        {heading}
      </Heading>
      <Text fontSize='md'>
        {text}
      </Text>
    </Flex>
  )
}

export default SimpleFormField