import { Checkbox, GridItem, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'


const TableView = ({config, selected, setSelected}: {config: any, selected: number, setSelected: React.Dispatch<number>}) => {
  return (
    <TableContainer>
      <Table size={'sm'}>
        <Thead>
          <Tr>
            <Th></Th>
            {config.headers.map((v: string, i: number) => (
              <Th key={i}>{v}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          
          {config.body.map((v: any, i: number) => (
            <Tr key={i}>
              <Td>
                <Checkbox
                  isChecked={selected == i}
                  onChange={() => {
                    if (selected == i) {
                      setSelected(null)
                      return
                    }
                    setSelected(i)
                  }}
                />
              </Td>
              {v.map((j: any, i: number) => (
                <Td key={i}>{j}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          {config.foot.map((v: any, i: number) => (
            <Tr key={i}>
              {v.map((j: any, i: number) => (
                <Th key={i}>{j}</Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default TableView