import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { memo } from 'react'
import Pagination from 'src/renderer/components/global/Pagination/Pagination'
import TableView from 'src/renderer/components/layout/ItemTable/TableView'
import { writeClient } from 'src/renderer/shared/store'

interface IDealsTableData {
  deal: any
  data: any[]
  openDealModal: (...args: any) => void
  totalPages: number
  currentPage: number
  onNextPage: () => void
  onPrevPage: () => void
}

const ClientTableData: React.FC<IDealsTableData> = memo(({ deal, data, openDealModal, totalPages, currentPage, onNextPage, onPrevPage }) => {
  const [,setClient] = useAtom(writeClient)
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База сделок
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
          <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={() => openDealModal()}>
            Создать новую сделку
          </Button>
        </Flex>
        <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
          <TableView
            selected={deal}
            setSelected={setClient}
            config={{
              headers: ['Фамилия', 'Имя', 'Отчество', 'Телефон', 'Почта'],
              body: data ? data.map((d: any) => [d.sure_name, d.first_name, d.last_name, d.phone, d.email]) : [],
              foot: []
            }}
          />
        </Box>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={onNextPage}
          onPrevious={onPrevPage}
        />
      </Flex>
    </Flex>
  );
});

const Deals = () => {
  return (
    <div>Deals</div>
  )
}

export default Deals
