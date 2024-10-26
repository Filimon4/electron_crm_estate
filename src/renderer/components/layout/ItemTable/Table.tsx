import { Grid } from '@chakra-ui/react'
import React from 'react'

const TableRight = ({rowArea, children}: {rowArea: string, children: React.ReactNode}) => {
  return (
    <Grid
      templateAreas={`
        "${rowArea}"
      `}
      gap={'10px'}
      width={'100%'}

    >
      {children}
    </Grid>
  )
}

export default TableRight