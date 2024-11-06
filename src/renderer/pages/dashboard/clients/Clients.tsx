import { Flex, Heading, Box } from '@chakra-ui/react'
import React from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import ItemInfo from '../../../components/layout/ItemTable/ItemInfo'
import TableView from '../../../components/layout/ItemTable/TableView'
import Table from '../../../components/layout/ItemTable/Table'
import { readClient, writeClient } from '../../../shared/store'
import { useAtom } from 'jotai'

const Clients = () => {
  const [client, __] = useAtom(readClient)
  const [_, setClient] = useAtom(writeClient)
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
                body: [
                  ['Рыков', 'Ефим', 'Витальевич', "+79091304497", "f.rykov@bk.ru"],
                ],
                foot: []
              }} />
            </Box>
            <Pagination currentPage={0} totalPages={100} onNext={() => console.log("next")} onPrevious={() => console.log("prev")} />
          </Flex>
        </Flex>
        <ItemInfo area='col2' config={{
          title: 'Квартира 1',
          price: 1000000
        }} />
      </Table>
    </>
  )
}

export default Clients