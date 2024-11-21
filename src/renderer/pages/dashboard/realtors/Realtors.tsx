import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import Table from '../../../components/layout/ItemTable/Table'
import TableView from '../../../components/layout/ItemTable/TableView'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { readRealtor, writeRealtor } from '../../../shared/store'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import RealtorInfo from '../../../components/layout/ItemTable/RealtorInfo'

const Realtors = () => {
  const [selected, __] = useAtom(readRealtor)
  const [_, setSelected] = useAtom(writeRealtor)

  const { isLoading, error, data } = useQuery({
    queryKey: ['getRealtors'],
    queryFn: async () => {
      //@ts-ignore
      return await window.context.getRealtor()
    },
  })

  const selectedRealtor = useMemo(() => {
    if (!data) return null
    return data[selected]
  }, [selected])
  console.log(data)

  return (
    <Table rowArea='col1 col1 col1 col1 col1 col2'>
      <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
        <Heading fontSize={'2xl'}>
          База риелторов
        </Heading>
        <Flex height={'55%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
          <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
            <TableView selected={selected} setSelected={setSelected} area='col1' config={{
              headers: ['Фамилия', 'Имя', 'Отчество', 'Телефон', 'Почта'],
              body: data ? data.map((d: any) => [d.secondName, d.firstName, d.lastName, d.phone, d.email]) : [],
              foot: []
            }} />
          </Box>
          <Pagination currentPage={0} totalPages={100} onNext={() => console.log("next")} onPrevious={() => console.log("prev")} />
        </Flex>
      </Flex>
      {selectedRealtor ?
          <RealtorInfo area='col2' config={{
            sure_name: selectedRealtor.secondName,
            first_name: selectedRealtor.firstName,
            last_name: selectedRealtor.lastName,
            phone: selectedRealtor.phone,
            email: selectedRealtor.email,
            description: selectedRealtor.description ?? '',
            password: selectedRealtor.password
          }} />
        : <>
          <EmptyItem area='col2' placeholder='Выберете клиента' />
        </>}
    </Table>
  )
}

export default Realtors