import { Flex, Heading, Box, Center, Button, useDisclosure } from '@chakra-ui/react'
import React, { memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import Pagination from '../../../components/global/Pagination/Pagination'
import TableView from '../../../components/layout/ItemTable/TableView'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import { readClient, readFilterClient, readUser, writeClient, writeFilterClient } from '../../../shared/store'
import ClientInfo from '../../../components/layout/ItemTable/ClientInfo/ClientInfo'
import CreateClientModal from '../../../components/modals/ClientModal/ClientModal'
import { UserRole } from '../../../shared/store/types'
import ClientInfoAdmin from '../../../components/layout/ItemTable/ClientInfo/ClientInfoAdmin'
import { notifyConfig } from '../../../shared/events/notifies.config'
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient'
import { ITableData } from '../../../shared/types/table.types'
import { CustomInlineFormInput } from '../../../components/global/FormInput/FormInput'
import { isLettersOnly, isNumbersOnly } from '../../../shared/utils/form'
import { FaFilter, FaFilterCircleXmark  } from "react-icons/fa6";
import { tableMaxField } from '../../../shared/utils/utils'

export const ClientFilterData = memo(() => {
  const [filters, setFilters] = useState({
    phone: '',
    email: '',
    first_name: '',
    sure_name: '',
    last_name: '',
  });
  const [,writeFilters] = useAtom(writeFilterClient)

  const applyFilters = () => {
    writeFilters({
      ...filters
    })
  }

  const clearFilters = () => {
    setFilters({
      phone: '',
      email: '',
      first_name: '',
      sure_name: '',
      last_name: '',
    })
    writeFilters({
      phone: '',
      email: '',
      first_name: '',
      sure_name: '',
      last_name: '',
    })
  }

  return (
    <>
      <Flex>
        <CustomInlineFormInput value={filters?.email ?? ''} setValue={(value) => setFilters({...filters, email: value})}
          id='email' inputType='email' name='Почта'
        />
        <CustomInlineFormInput value={filters?.phone ?? ''} setValue={(value) => setFilters({...filters, phone: value})} 
          id='phone' inputType={'tel'} name='Тел.'  regexCheck={(value: string) => isNumbersOnly(value)}
        />
        <CustomInlineFormInput value={filters?.first_name ?? ''} setValue={(value) => setFilters({...filters, first_name: value})} 
          id='first_name' inputType={'text'} name='Имя'  regexCheck={(value: string) => isLettersOnly(value)}
        />
        <CustomInlineFormInput value={filters?.sure_name ?? ''} setValue={(value) => setFilters({...filters, sure_name: value})} 
          id='sure_name' inputType={'text'} name='Фам.'  regexCheck={(value: string) => isLettersOnly(value)}
        />
        <CustomInlineFormInput value={filters?.last_name} setValue={(value) => setFilters({...filters, last_name: value})}
          id='last_name' inputType={'text'} name='Отч.'  regexCheck={(value: string) => isLettersOnly(value)}
        />
        <Button size={'sm'} alignSelf={'center'} minW={'30px'} minH={'30px'} onClick={applyFilters}>
          <FaFilter />
        </Button>
        <Button size={'sm'} alignSelf={'center'} minW={'30px'} minH={'30px'} onClick={clearFilters}>
          <FaFilterCircleXmark />
        </Button>
      </Flex>
    </>
  )
})

const ClientTableData: React.FC<ITableData> = memo(({ currentPage,data,onNextPage,onPrevPage,openModal,selected,setSelected,totalPages }) => {
  return (
    <Flex flexDirection={'column'} maxW={'85rem'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База клиентов
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        {data && currentPage && <>
          <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
            <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={() => openModal()}>
              Создать нового клиента
            </Button>
          </Flex>
          <ClientFilterData />
          <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
            <TableView
              selected={selected}
              setSelected={setSelected}
              config={{
                headers: ['Фамилия', 'Имя', 'Отчество', 'Телефон', 'Почта'],
                body: data ? data.map((d: any) => [tableMaxField(d.sure_name), tableMaxField(d.first_name), tableMaxField(d.last_name), tableMaxField(d.phone), tableMaxField(d.email)]) : [],
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
        </>}
      </Flex>
    </Flex>
  );
});


const Clients = () => {
  const { isOpen: isClientModal, onOpen: openClientModal, onClose: closeClientModal } = useDisclosure();
  const [client,] = useAtom(readClient)
  const [,setClient] = useAtom(writeClient)
  const [user,] = useAtom(readUser)
  const [readFilters,] = useAtom(readFilterClient)

  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [disableDelete, setDisableDelete] = useState(false)

  const { data: clientsPageData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getClientsByPage'], {
      currentPage: currentPage
    }],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getClientsByPage(user.id, currentPage, 10, readFilters)
      setMaxPage(result.count > 0 ? Math.ceil(result.count / 10) : 1)
      return result
    },
    placeholderData: keepPreviousData,
  });
  
  useEffect(() => {
    setClient(null)
    setCurrentPage(1)
    refetch()
    queryClient.invalidateQueries({
      predicate: (query) =>
        //@ts-ignore
        query.queryKey[0] === QUERY_KEYS['getClientsByPage'] && query.queryKey[1]?.currentPage > currentPage,
    })
  }, [readFilters])

  useEffect(() => {
    setMaxPage(clientsPageData?.count ? Math.ceil(clientsPageData?.count / 10) : 1)
    setClient(null)
  }, [])
  
  useEffect(() => {
    setClient(null)
  }, [currentPage])
  
  const onUpdateClient = async (key: string, value: string) => {
    const newClientData = structuredClone(clientData)
    newClientData[key] = value
    //@ts-ignore
    const result = await window.invokes.updateClient(newClientData)
    if (result) {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
      refetch()
    } else {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
    } 
  }
  const onDeleteUser = async (id: number) => {
    setDisableDelete(true)
    //@ts-ignore
    const resultDel = await window.invokes.deleteClient(id)
    if (resultDel) {
      setClient(null)
      refetch()
      queryClient.invalidateQueries({
        predicate: (query) =>
          //@ts-ignore
          query.queryKey[0] === QUERY_KEYS['getClientsByPage'] && query.queryKey[1]?.currentPage > currentPage,
      })
    }
    setDisableDelete(false)
  }
  const onCreateNewClient = async () => {
    console.log('create new client')
    setCurrentPage(prev => maxPage)
    refetch()
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
      <Flex width={'100%'} overflowY={'hidden'} overflowX={'hidden'}>
        <ClientTableData
          currentPage={currentPage}
          totalPages={maxPage}
          data={clientsPageData?.clients ?? []}
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
        {clientData ? <>
          {user.role == UserRole.ADMIN ? <>
            <ClientInfoAdmin
             onChangeClient={onUpdateClient}
             onDeleteClient={onDeleteUser}
             config={clientData}
             disableDelete={disableDelete}
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