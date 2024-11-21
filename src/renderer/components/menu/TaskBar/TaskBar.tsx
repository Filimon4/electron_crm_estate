import { Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import { useAtom } from 'jotai'
import { currentHomePage, readUser } from '../../../shared/store'
import { taskBarAdminConfig, taskBarConfig } from '../../../shared/config/taskBar.config'
import { UserRole } from '../../../shared/store/types'

const TaskBar = () => {
  const [page, setPage] = useAtom(currentHomePage)
  const [user, _] = useAtom(readUser)
  
  const onChangePage = (bar: any) => {
    setPage(bar.type)
  }

  if (!user || user === null) return <></>
  return (
    <VStack align="start" marginBottom={'6rem'}>
      {taskBarConfig.map((bar,i) => (
        <Flex key={i} onClick={e => onChangePage(bar)} backgroundColor={bar.type === page ? "gray.700": ''} align="center" justify={"flex-start"} paddingLeft={'2em'} cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
          <Text>{bar.name}</Text>
        </Flex>
      ))}
      {user.role === UserRole.ADMIN && <>
        {taskBarAdminConfig.map((bar, i) => (
          <Flex key={i} onClick={e => onChangePage(bar)} backgroundColor={bar.type === page ? "gray.700": ''} align="center" justify={"flex-start"} paddingLeft={'2em'} cursor="pointer" _hover={{ bg: "gray.700" }} width={'100%'} height={'50px'}>
            <Text>{bar.name}</Text>
          </Flex>
        ))}
      </>}
    </VStack>
  )
}

export default TaskBar