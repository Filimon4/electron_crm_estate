import { Flex, Heading, Box, Center } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import ItemInfo from '../../../components/layout/ItemTable/ItemInfo'
import TableView from '../../../components/layout/ItemTable/TableView'
import Table from '../../../components/layout/ItemTable/Table'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import { readClient, writeClient } from '../../../shared/store'
import { useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'

const Clients = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getClients'],
    queryFn: async () => {
      //@ts-ignore
      return await window.context.getClients()
    }
  })
  const [client, __] = useAtom(readClient)
  const [_, setClient] = useAtom(writeClient)

  const clientData = useMemo(() => {
    if (!data) return null
    return data[client]
  }, [client])
  
  return (
    <>
      <Table rowArea='col1 col1 col1 col1 col1 col2'>
        <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
          <Heading fontSize={'2xl'}>
            База объектов
          </Heading>
          <Flex height={'55%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
            <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
              <TableView selected={client} setSelected={setClient} area='col1' config={{
                headers: ['Фамилия', 'Имя', 'Отчество', 'Телефон', 'Почта'],
                body: data ? data : [],
                foot: []
              }} />
            </Box>
            <Pagination currentPage={0} totalPages={100} onNext={() => console.log("next")} onPrevious={() => console.log("prev")} />
          </Flex>
        </Flex>
        {clientData ?
          <ItemInfo area='col2' config={{
            title: 'Квартира 1',
            adress: '123123',
            flatsize: '123',
            roomsAmount: '123',
            bedroomsAmount: '123',
            description: '123',
            price: 1000000
          }} />
        : <>
          <EmptyItem area='col2' />
        </>}
      </Table>
    </>
  )
}

export default Clients