import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import TableView from '../../../components/layout/ItemTable/TableView'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { readRealtor, readUser, writeRealtor } from '../../../shared/store'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import CreateRealtorModal from '../../../components/modals/RealtorModal/RealtorModal'
import RealtorInfoAdmin from '../../../components/layout/ItemTable/RealtorInfo/RealtorInfoAdmin'
import { notifyConfig } from '../../../shared/events/notifies.config'

const Realtors = () => {
  const { isOpen: isRealtorModal, onOpen: openRealtorModal, onClose: closeRealtorModal } = useDisclosure();
  const [selected, __] = useAtom(readRealtor)
  const [_, setSelected] = useAtom(writeRealtor)

  const [update, setUpdatd] = useState(false)
  const emitRerender = () => {
    setUpdatd(!update)
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['getRealtors'],
    queryFn: async () => {
      //@ts-ignore
      return await window.context.getRealtor()
    },
  })

  const selectedRealtor = useMemo(() => {
    if (!data) return null
    return data[selected]
  }, [selected])

  const onUpdateEstate = async (key: string, value: string) => {
    if (!selectedRealtor) return
    if (selectedRealtor[key] === undefined) return
    selectedRealtor[key]=value
    //@ts-ignore
    const result = await window.context.updateClient(selectedRealtor)
    if (!result) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      data[selected][key] = value
      emitRerender()
    } else {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
    } 
  }

  return (
    <>
      <Flex width={'100%'} >
        <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
          <Heading fontSize={'2xl'}>
            База риелторов
          </Heading>
          <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
            <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
              <Button color={'black'} _hover={{bg: 'gray.400'}} variant='outline' onClick={() => openRealtorModal()}>
                Создать нового риелтора
              </Button>
            </Flex>
            <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
              <TableView selected={selected} setSelected={setSelected} config={{
                headers: ['Фамилия', 'Имя', 'Отчество', 'Телефон', 'Почта'],
                body: data ? data.map((d: any) => [d.secondName, d.firstName, d.lastName, d.phone, d.email]) : [],
                foot: []
              }} />
            </Box>
            <Pagination currentPage={0} totalPages={100} onNext={() => console.log("next")} onPrevious={() => console.log("prev")} />
          </Flex>
        </Flex>
        {selectedRealtor ?
          <RealtorInfoAdmin
            onChangeEstate={onUpdateEstate}
            config={{
              sure_name: selectedRealtor.secondName,
              first_name: selectedRealtor.firstName,
              last_name: selectedRealtor.lastName,
              phone: selectedRealtor.phone,
              email: selectedRealtor.email,
              description: selectedRealtor.description ?? '',
              password: selectedRealtor.password
            }} 
          />
          : <>
            <EmptyItem placeholder='Выберете клиента' />
          </>}
      </Flex>
      <CreateRealtorModal onClose={closeRealtorModal} isOpen={isRealtorModal} />
    </>
  )
}

export default Realtors