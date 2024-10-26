import { Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import { useAtom } from 'jotai'
import { currentHomePage } from '../../../shared/store'
import { taskBarConfig } from '../../../shared/config/taskBar.config'

const TaskBar = () => {
  const [page, setPage] = useAtom(currentHomePage)
  
  const onChangePage = (bar: any) => {
    setPage(bar.type)
  }

  return (
    <VStack align="start" marginBottom={'6rem'}>
      {taskBarConfig.map((bar,i) => (
        <Flex key={i} onClick={e => onChangePage(bar)} backgroundColor={bar.type === page ? "gray.700": ''} align="center" justify={"flex-start"} paddingLeft={'2em'} cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
          <Text>{bar.name}</Text>
        </Flex>
      ))}
    </VStack>
  )
}

export default TaskBar