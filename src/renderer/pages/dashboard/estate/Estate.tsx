import React, { useEffect, useMemo, useState } from 'react'
import TableView from '../../../components/layout/ItemTable/TableView'
import ItemInfo from '../../../components/layout/ItemTable/ItemInfo/ItemInfo'
import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import Pagination from '../../../components/global/Pagination/Pagination'
import { useAtom } from 'jotai'
import { readEstate, readUser, writeEstate } from '../../../shared/store'
import { useQuery } from '@tanstack/react-query'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import CreateEstateModal from '../../../components/modals/EstateModal/EstateModal'
import { UserRole } from '../../../shared/store/types'
import ItemInfoAdmin from '../../../components/layout/ItemTable/ItemInfo/ItemInfoAdmin'
import { notifyConfig } from '../../../shared/events/notifies.config'

const Estate = () => {
  const { isOpen: isEstateModal, onOpen: openEstateModal, onClose: closeEstatetModal } = useDisclosure();
  const [selected,] = useAtom(readEstate)
  const [,setSelected] = useAtom(writeEstate)
  const [user,] = useAtom(readUser)

  const [update, setUpdatd] = useState(false)
  const emitRerender = () => {
    setUpdatd(!update)
  }

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['getEstate'],
    queryFn: async () => {
      //@ts-ignore
      return await window.context.getEstate()
    },
  })

  const selectedEstate = useMemo(() => {
    if (!data) return null
    return data[selected]
  }, [selected])

  const onUpdateEstate = async (key: string, value: string) => {
    if (!selectedEstate) return
    if (selectedEstate[key] === undefined) return
    //@ts-ignore
    const result = await window.context.updateClient(selectedEstate)
    if (!result) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
    } else {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
      data[selected] = value
      emitRerender()
      refetch()
    } 
  }

  const onDeleteEstate = async (id: number) => {
    //@ts-ignore
    const resultDel = await window.context.deleteEstate(id)
    if (resultDel) {
      refetch()
      setSelected(null)
    }
  }

  return (
    <>
      <Flex width={'100%'} >
        <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
          <Heading fontSize={'2xl'}>
            База клиентов
          </Heading>
          <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
            <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
              <Button color={'black'} _hover={{bg: 'gray.400'}} variant='outline' onClick={() => openEstateModal()}>
                Создать нового объекта
              </Button>
            </Flex>
            <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
              <TableView selected={selected} setSelected={setSelected} config={{
                headers: ['Адресс', 'Комнаты', 'Этаж', 'Площадь'],
                body: data ? data.map((d: any) => [d.house.street, d.room_amount, d.floor, d.size]) : [],
                foot: []
              }} />
            </Box>
            <Pagination currentPage={0} totalPages={100} onNext={() => console.log("next")} onPrevious={() => console.log("prev")} />
          </Flex>
        </Flex>
        {selectedEstate ? <>
          {user.role == UserRole.ADMIN ? <>
            <ItemInfoAdmin
              onDeleteEstate={onDeleteEstate}
              onChangeEstate={onUpdateEstate}
              config={{
                id: selectedEstate.id,
                room_amount: selectedEstate.room_amount,
                flat: selectedEstate.flat,
                floor: selectedEstate.floor,
                size: selectedEstate.size,
                adress: `${selectedEstate.house.street} ${selectedEstate.house.house_number}`,
                price: selectedEstate.price,
                description: selectedEstate.description ?? ' '
              }}
            />
          </> : <>
            <ItemInfo config={{
              room_amount: selectedEstate.room_amount,
              flat: selectedEstate.flat,
              floor: selectedEstate.floor,
              size: selectedEstate.size,
              adress: `${selectedEstate.house.street} ${selectedEstate.house.house_number}`,
              price: selectedEstate.price,
              description: selectedEstate.description ?? ' '
            }}/>
          </>} 
        </> : <>
          <EmptyItem placeholder='Выберете объект' />
        </>}
      </Flex>
      <CreateEstateModal onClose={closeEstatetModal} isOpen={isEstateModal} refetch={refetch} />
    </>
  )
}

export default Estate