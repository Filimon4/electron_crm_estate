import { Box, Flex, Text, VStack, Icon, Image, Center } from '@chakra-ui/react'
import React from 'react'

import house from "../../public/icons/house.png"
import { Link } from 'react-router-dom'
import { route_pages } from '../../shared/route'

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
      <VStack align="start" marginBottom={'6rem'}>
        <Flex align="center" justify={"flex-start"} paddingLeft={'2em'} cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
          <Text>Рабочий стол</Text>
        </Flex>
        <Flex align="center" justify={"flex-start"} paddingLeft={'2em'} cursor="pointer" _hover={{ bg: "gray.700"}} width={'100%'} height={'50px'}>
          <Text>Объекты</Text>
        </Flex>
        <Flex align="center" justify={"flex-start"} paddingLeft={'2em'} cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
          <Text>Клиенты</Text>
        </Flex>
        <Flex align="center" justify={"flex-start"} paddingLeft={'2em'} cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
          <Text>Отчёты</Text>
        </Flex>
        <Flex align="center" justify={"flex-start"} paddingLeft={'2em'} cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
          <Text>Календарь</Text>
        </Flex>
      </VStack>

      <Box>
        <Text>
          <Link to={route_pages.singin}>Auth</Link>
        </Text>
      </Box>
    </Flex>
  )
}

export default TaskBar