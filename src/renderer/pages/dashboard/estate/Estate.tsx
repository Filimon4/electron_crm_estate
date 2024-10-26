import React from 'react'
import Table from '../../../components/layout/ItemTable/Table'
import TableView from '../../../components/layout/ItemTable/TableView'
import ItemInfo from '../../../components/layout/ItemTable/ItemInfo'

const Estate = () => {
  return (
    <Table rowArea='col1 col1 col1 col1 col1 col2'>
      <TableView area='col1' config={{
        headers: ['h1', 'h2', 'h3'],
        body: [
          ['b1', 'b2', 'b3']
        ],
        foot: [
          ['f1', 'f2', 'f3']
        ]
      }} />
      <ItemInfo area='col2' config={{
        title: 'test1',
        price: '123123'
      }} />
    </Table>
  )
}

export default Estate