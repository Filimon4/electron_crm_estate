import React from 'react'
import Table from '../../../components/layout/ItemTable/Table'
import TableView from '../../../components/layout/ItemTable/TableView'
import ItemInfo from '../../../components/layout/ItemTable/ItemInfo'
import { Flex, Heading } from '@chakra-ui/react'
import Pagination from '../../../components/global/Pagination/Pagination'

const Estate = () => {
  return (
    <>
      <Table rowArea='col1 col1 col1 col1 col1 col2'>
        <Flex flexDirection={'column'} height={'100%'} width={'100%'} gridArea={'col1'}>
          <Heading>
            База объектов
          </Heading>
          <TableView area='col1' config={{
            headers: ['Имя', 'Фамилия', 'Отчество', 'Почта', 'Телефон'],
            body: [
              ['b1', 'b2', 'b3']
            ],
            foot: [
            ]
          }} />
          <Pagination currentPage={0} totalPages={100} onNext={() => console.log("next")} onPrevious={() => console.log("prev")} />
        </Flex>
        <ItemInfo area='col2' config={{
          title: 'test1',
          price: '123123'
        }} />
      </Table>
    </>
  )
}

export default Estate