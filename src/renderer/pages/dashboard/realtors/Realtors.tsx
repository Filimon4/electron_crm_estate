import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import ItemInfo from '../../../components/layout/ItemTable/ItemInfo'
import Table from '../../../components/layout/ItemTable/Table'
import TableView from '../../../components/layout/ItemTable/TableView'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { readRealtor, writeRealtor } from '../../../shared/store'

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

  return (
    <Table rowArea='col1 col1 col1 col1 col1 col2'>
      <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
        <Heading fontSize={'2xl'}>
          База объектов
        </Heading>
        <Flex height={'55%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
          <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
            <TableView selected={selected} setSelected={setSelected} area='col1' config={{
              headers: ['1', '2', '3', '4'],
              body: data ? data.map((d: any) => [d.house.street, d.room_amount, d.floor, d.size]) : [],
              foot: []
            }} />
          </Box>
          <Pagination currentPage={0} totalPages={100} onNext={() => console.log("next")} onPrevious={() => console.log("prev")} />
        </Flex>
      </Flex>
      <ItemInfo area='col2' config={{
        title: '123123',
      }}/>
    </Table>
  )
}

export default Realtors