import React, { memo, useEffect, useMemo, useState } from 'react'
import TableView from '../../../components/layout/ItemTable/TableView'
import ItemInfo from '../../../components/layout/ItemTable/ItemInfo/ItemInfo'
import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import Pagination from '../../../components/global/Pagination/Pagination'
import { useAtom } from 'jotai'
import { readEstate, readUser, writeEstate } from '../../../shared/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import CreateEstateModal from '../../../components/modals/EstateModal/EstateModal'
import { UserRole } from '../../../shared/store/types'
import ItemInfoAdmin from '../../../components/layout/ItemTable/ItemInfo/ItemInfoAdmin'
import { notifyConfig } from '../../../shared/events/notifies.config'
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient'

interface IEsateTableData {
  estate: any
  data: any[]
  openEstateModal: (...args: any) => void
  totalPages: number
  currentPage: number
  onNextPage: () => void
  onPrevPage: () => void
}

const EsateTableData: React.FC<IEsateTableData> = memo(({
  currentPage,
  data,
  estate,
  onNextPage,
  onPrevPage,
  openEstateModal,
  totalPages
}) => {
  const [,setEstate] = useAtom(writeEstate)
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База объектов
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
          <Button color={'black'} _hover={{bg: 'gray.400'}} variant='outline' onClick={() => openEstateModal()}>
            Создать нового объекта
          </Button>
        </Flex>
        <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
          <TableView selected={estate} setSelected={setEstate} config={{
            headers: ['Адресс', 'Номер квартиры', 'Комнаты', 'Этаж', 'Площадь'],
            body: data ? data.map((d: any) => [d.house.street, d.flat, d.room_amount, d.floor, d.size]) : [],
            foot: []
          }} />
        </Box>
        <Pagination currentPage={currentPage} totalPages={totalPages} onNext={onNextPage} onPrevious={onPrevPage} />
      </Flex>
    </Flex>
  )
})

const Estate = () => {
  const { isOpen: isEstateModal, onOpen: openEstateModal, onClose: closeEstatetModal } = useDisclosure();
  const [estate,] = useAtom(readEstate)
  const [user,] = useAtom(readUser)
  const [,setEstate] = useAtom(writeEstate)

  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { data: estatesPageData, isError, isLoading, isPlaceholderData } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getFlatesByPage'], currentPage],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getFlatesByPage(currentPage, 10)
      setMaxPage(Math.ceil(result.count / 10))
      return result
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setMaxPage(estatesPageData?.count ? Math.ceil(estatesPageData?.count / 10) : 1)
    setEstate(null)
  }, [])
  
  useEffect(() => {
    setEstate(null)
  }, [currentPage])

  const clientData = useMemo(() => {
      if (estate !== undefined && estate !== null && estatesPageData) {
        return estatesPageData?.flats[estate]
      }
      return null
    }, [estate])

  const onUpdateEstate = async (key: string, value: string) => {
    if (!clientData) return
    if (clientData[key] === undefined) return
    //@ts-ignore
    const result = await window.invokes.updateFlat(clientData)
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

  const onDeleteEstate = async (id: number) => {
    //@ts-ignore
    const resultDel = await window.invokes.deleteFlat(id)
    if (resultDel) {
      setEstate(null)
    }
  }

  const onCreateNewEstate = async () => {
      console.log('create new client')
      setCurrentPage(prev => maxPage)
      queryClient.invalidateQueries({
        //@ts-ignore
        queryKey: [QUERY_KEYS['getFlatesByPage'], maxPage],
        exact: true,
        refetchType: 'active'
      })
    }

  if (!estatesPageData) return <></>
  return (
    <>
      <Flex width={'100%'} overflow={'scroll'}>
        { estatesPageData && currentPage && <>
          <EsateTableData
            currentPage={currentPage} totalPages={maxPage}
            data={estatesPageData.flats ?? []}
            estate={estate} onNextPage={() => {
              setCurrentPage(prev => prev + 1)
            }}
            onPrevPage={() => {
              setCurrentPage(prev => prev - 1)
            }}
            openEstateModal={openEstateModal}
          />
        </>}
        {clientData ? <>
          {user.role == UserRole.ADMIN ? <>
            <ItemInfoAdmin
              onDeleteEstate={onDeleteEstate}
              onChangeEstate={onUpdateEstate}
              config={{
                ...clientData,
                adress: `${clientData.house.street} ${clientData.house.house_number}`,
              }}
            />
          </> : <>
            <ItemInfo config={{
              ...clientData,
              adress: `${clientData.house.street} ${clientData.house.house_number}`,
            }}/>
          </>} 
        </> : <>
          <EmptyItem placeholder='Выберете объект' />
        </>}
      </Flex>
      <CreateEstateModal onClose={closeEstatetModal} isOpen={isEstateModal} refetch={onCreateNewEstate} />
    </>
  )
}

export default Estate