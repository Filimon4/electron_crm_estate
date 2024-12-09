import { Flex, Heading, Box, Center, Button, useDisclosure } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
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

const Clients = () => {
  const { isOpen: isClientModal, onOpen: openClientModal, onClose: closeClientModal } = useDisclosure();
  const { isLoading, error, data } = useQuery({
    queryKey: ['getClients'],
    queryFn: async () => {
      //@ts-ignore
      return await window.context.getClients()
    }
  })
  const [client,] = useAtom(readClient)
  const [, setClient] = useAtom(writeClient)
  const [user,] = useAtom(readUser)

  const [update, setUpdatd] = useState(false)
  const emitRerender = () => {
    setUpdatd(!update)
  }

  const clientData = useMemo(() => {
    if (!data) return null
    return data[client]
  }, [client])

  const onUpdateClient = async (key: string, value: string) => {
    if (!clientData) return
    if (clientData[key] === undefined) return
    clientData[key]=value
    //@ts-ignore
    const result = await window.context.updateClient(clientData)
    if (!result) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      data[client][key] = value
      emitRerender()
    } else {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
    } 
  }
  
  return (
    <>
      <Flex width={'100%'}>
        <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
          <Heading fontSize={'2xl'}>
            База объектов
          </Heading>
          <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
            <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
              <Button color={'black'} _hover={{bg: 'gray.400'}} variant='outline' onClick={() => openClientModal()}>
                Создать нового клиента
              </Button>
            </Flex>
            <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
              <TableView selected={client} setSelected={setClient} config={{
                headers: ['Фамилия', 'Имя', 'Отчество', 'Телефон', 'Почта'],
                body: data ? data.map((d: any) => [d.secondName, d.firstName, d.lastName, d.phone, d.email]) : [],
                foot: []
              }} />
            </Box>
            <Pagination currentPage={0} totalPages={100} onNext={() => console.log("next")} onPrevious={() => console.log("prev")} />
          </Flex>
        </Flex>
        {clientData ? <>
          {user.role == UserRole.ADMIN ? <>
            <ClientInfoAdmin
             onChangeClient={onUpdateClient}
             config={{
                secondName: clientData.secondName,
                firstName: clientData.firstName,
                lastName: clientData.lastName,
                phone: clientData.phone,
                email: clientData.email,
                description: clientData.description ?? '',
              }}
            />
          </> : <>
            <ClientInfo config={{
              secondName: clientData.secondName,
              firstName: clientData.firstName,
              lastName: clientData.lastName,
              phone: clientData.phone,
              email: clientData.email,
              description: clientData.description ?? '',
            }} />
          </>}
        </>
        : <>
          <EmptyItem placeholder='Выберете клиента' />
        </>}
      </Flex>
      <CreateClientModal onClose={closeClientModal} isOpen={isClientModal} />
    </>
  )
}

export default Clients