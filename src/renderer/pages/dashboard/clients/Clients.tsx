import { Flex, Heading, Box, Center, Button, useDisclosure } from '@chakra-ui/react'
import React, { memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import Pagination from '../../../components/global/Pagination/Pagination'
import TableView from '../../../components/layout/ItemTable/TableView'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import { readClient, readUser, writeClient } from '../../../shared/store'
import ClientInfo from '../../../components/layout/ItemTable/ClientInfo/ClientInfo'
import CreateClientModal from '../../../components/modals/ClientModal/ClientModal'
import { UserRole } from '../../../shared/store/types'
import ClientInfoAdmin from '../../../components/layout/ItemTable/ClientInfo/ClientInfoAdmin'
import { notifyConfig } from '../../../shared/events/notifies.config'
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient'
import { ITableData } from '../../../shared/types/table.types'

const ClientTableData: React.FC<ITableData> = memo(({ currentPage,data,onNextPage,onPrevPage,openModal,selected,setSelected,totalPages }) => {
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База клиентов
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
          <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={() => openModal()}>
            Создать нового клиента
          </Button>
        </Flex>
        <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
          <TableView
            selected={selected}
            setSelected={setSelected}
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


const Clients = () => {
  const { isOpen: isClientModal, onOpen: openClientModal, onClose: closeClientModal } = useDisclosure();
  const [client,] = useAtom(readClient)
  const [,setClient] = useAtom(writeClient)
  const [user,] = useAtom(readUser)

  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { data: clientsPageData, isError, isLoading, isPlaceholderData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getClientsByPage'], currentPage],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getClientsByPage(user.id, currentPage, 10)
      setMaxPage(Math.ceil(result.count / 10))
      return result
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setMaxPage(clientsPageData?.count ? Math.ceil(clientsPageData?.count / 10) : 1)
    setClient(null)
  }, [])
  
  useEffect(() => {
    setClient(null)
  }, [currentPage])
  
  const onUpdateClient = async (key: string, value: string) => {
    //@ts-ignore
    const result = await window.invokes.updateClient(clientData)
    if (!result) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
    } else {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
    } 
  }
  const onDeleteUser = async (id: number) => {
    //@ts-ignore
    const resultDel = await window.invokes.deleteClient(id)
    if (resultDel) {
      setClient(null)
    }
  }
  const onCreateNewClient = async () => {
    console.log('create new client')
    setCurrentPage(prev => maxPage)
    queryClient.invalidateQueries({
      //@ts-ignore
      queryKey: [QUERY_KEYS['getClientsByPage'], maxPage],
      exact: true,
      refetchType: 'active'
    })
  }

  const clientData = useMemo(() => {
    if (client !== undefined && client !== null && clientsPageData) {
      return clientsPageData?.clients[client]
    }
    return null
  }, [client])


  return (
    <>
      <Flex width={'100%'} overflow={'scroll'}>
        {clientsPageData && currentPage && <>
          <ClientTableData
            currentPage={currentPage}
            totalPages={maxPage}
            data={clientsPageData.clients ?? []}
            selected={client}
            onNextPage={() => {
              setCurrentPage(prev => prev + 1)
            }}
            onPrevPage={() => {
              setCurrentPage(prev => prev - 1)
            }}
            openModal={openClientModal}
            setSelected={setClient}
          />
        </>}
        {clientData ? <>
          {user.role == UserRole.ADMIN ? <>
            <ClientInfoAdmin
             onChangeClient={onUpdateClient}
             onDeleteClient={onDeleteUser}
             config={clientData}
            />
          </> : <>
            <ClientInfo config={clientData} />
          </>}
        </>
        : <>
          <EmptyItem placeholder='Выберете клиента' />
        </>}
      </Flex>
      <CreateClientModal onClose={closeClientModal} isOpen={isClientModal} refetch={onCreateNewClient} />
    </>
  )
}

export default Clients