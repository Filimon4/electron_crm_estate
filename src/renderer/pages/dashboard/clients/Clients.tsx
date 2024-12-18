import { Flex, Heading, Box, Center, Button, useDisclosure } from '@chakra-ui/react'
import React, { memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
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
import { QUERY_KEYS } from '../../../shared/lib/queryClient'
import { TPageClient } from '../../../shared/api/clients.api'

interface IClientTableData {
  client: any
  data: any[]
  openClientModal: (...args: any) => void
  totalPages: number
  currentPage: number
  onNextPage: () => void
  onPrevPage: () => void
}

const ClientTableData: React.FC<IClientTableData> = memo(({ client, data, openClientModal, totalPages, currentPage, onNextPage, onPrevPage }) => {
  const [,setClient] = useAtom(writeClient)
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База объектов
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
          <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={() => openClientModal()}>
            Создать нового клиента
          </Button>
        </Flex>
        <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
          <TableView
            selected={client}
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


const Clients = () => {
  const [client,] = useAtom(readClient)
  const [,setClient] = useAtom(writeClient)
  const [user,] = useAtom(readUser)

  const { isOpen: isClientModal, onOpen: openClientModal, onClose: closeClientModal } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
    error,
    isLoading,
  } = useInfiniteQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS["getClientsByPage"]],
    queryFn: async ({ pageParam = 1, ...args }) => {
      //@ts-ignore
      const pageData: TPageClient = await window.invokes.getClientsByPage(user.id, pageParam, 10)
      if (pageData.count) {
        setMaxPage(Math.ceil(pageData.count / 10))
      }
      return pageData
    },
    initialPageParam: 1, 
    getNextPageParam: (lastPage: TPageClient, allPages, lastPageParam, ...args) => {
      if (lastPage?.clients?.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    // getPreviousPageParam: (firstPage, allPages, firstPageParam, ...args) => {
    //   if (firstPageParam <= 0) {
    //     return undefined;
    //   }
    //   return firstPageParam - 1;
    // },
    maxPages: maxPage,
    retryOnMount: true,
    retryDelay: 10000,
  });
  
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
  
  const clientData = useMemo(() => data?.pages[(currentPage-1)]?.clients[client] ?? null, [currentPage])

  if (!data) return <></>
  return (
    <>
      <Flex width={'100%'} overflow={'scroll'}>
        {data && data?.pages && <>
          <ClientTableData
            currentPage={currentPage} totalPages={maxPage}
            data={data?.pages[(currentPage-1)]?.clients ?? []}
            client={client} onNextPage={() => {
              fetchNextPage()
              setCurrentPage(prev => prev + 1)
            }}
            onPrevPage={() => {
              setCurrentPage(prev => prev - 1)
            }}
            openClientModal={() => 'openclient modal'}
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
      <CreateClientModal onClose={closeClientModal} isOpen={isClientModal} refetch={() => console.log('refetch')} />
    </>
  )
}

export default Clients