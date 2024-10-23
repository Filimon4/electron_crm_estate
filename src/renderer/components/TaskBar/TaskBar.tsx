import { Box, Flex, Text, VStack, Icon, Image } from '@chakra-ui/react'
import React from 'react'

import house from "../../public/icons/house.png"

const TaskBar = () => {
  return (
    <Flex
      direction="column"
      height="100vh"
      width="200px"
      backgroundColor="gray.400"
      color="white"
      justifyContent={'space-between'}
    >
      <Flex mb={8} alignItems={'center'} justifyContent={'center'} paddingTop={'20px'}>
        <Image src={house} boxSize='50px' />
        <Text>CRM система</Text>
      </Flex>

      <VStack align="start">
        <Flex align="center" cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
          {/* <Icon as={} boxSize={6} mr={3} /> */}
          <Text>Рабочий стол</Text>
        </Flex>

        <Flex align="center" cursor="pointer" _hover={{ bg: "gray.700"}} width={'100%'} height={'50px'}>
          {/* <Icon as={} boxSize={6} mr={3} /> */}
          <Text>База объектов</Text>
        </Flex>

        <Flex align="center" cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
          {/* <Icon as={} boxSize={6} mr={3} /> */}
          <Text>Клиенты</Text>
        </Flex>

        {/* Add more options as needed */}
      </VStack>

      <Box>
        <Text>
          Some text
        </Text>
      </Box>
    </Flex>
  )
}

export default TaskBar