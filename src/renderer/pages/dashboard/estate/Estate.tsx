import React, { memo, useEffect, useMemo, useState } from 'react'
import TableView from '../../../components/layout/ItemTable/TableView'
import ItemInfo from '../../../components/layout/ItemTable/ItemInfo/ItemInfo'
import { Box, Button, filter, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import Pagination from '../../../components/global/Pagination/Pagination'
import { useAtom } from 'jotai'
import { readEstate, readFilterEstate, readFilterHouse, readUser, writeEstate, writeFilterEstate } from '../../../shared/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import CreateEstateModal from '../../../components/modals/EstateModal/EstateModal'
import { UserRole } from '../../../shared/store/types'
import ItemInfoAdmin from '../../../components/layout/ItemTable/ItemInfo/ItemInfoAdmin'
import { notifyConfig } from '../../../shared/events/notifies.config'
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient'
import { ITableData } from '../../../shared/types/table.types'
import { CustomInlineFormInput, CustomInlineFromSelector } from '../../../components/global/FormInput/FormInput'
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6'
import { isNumbersOnly } from '../../../shared/utils/form'

const sizeOptions = [
  { id: 0, label: 'Все', value: [null, null]},
  { id: 1, label: '1 - 50', value: [0, 50] },
  { id: 2, label: '50 - 100', value: [50, 100] },
  { id: 3, label: '100 - 300', value: [100, 300] },
  { id: 4, label: '300+', value: [300, 999999999] },
];
const roomsOptions = [
  { id: 0, label: 'Все', value: [null, null]},
  { id: 1, label: '1 - 2', value: [1, 2] },
  { id: 2, label: '2 - 4', value: [2, 3] },
  { id: 3, label: '4 - 6', value: [4, 5] },
  { id: 4, label: '6+', value: [6, 999999999] },
];
const priceOptions = [
  { id: 0, label: 'Все', value: [null, null]},
  { id: 1, label: '0 - 2м', value: [0, 2000000] },
  { id: 2, label: '2м - 5м', value: [2000000, 5000000] },
  { id: 3, label: '5м - 10м', value: [5000000, 10000000] },
  { id: 4, label: '10м - 30м', value: [10000000, 30000000] },
  { id: 5, label: '30м+', value: [30000000, 1000000000] },
];

export const ComplexesFilterData = memo(() => {
  const [filters, setFilters] = useState({
    house_id: null,
    size: 0,
    room_amount: 0,
    price: 0,
  });
  const [,writeFilters] = useAtom(writeFilterEstate)

  const applyFilters = () => {
    const validFilters: {[k in any]: any} = {}
    if (filters.house_id !== null)
      validFilters['house_id'] = filters.house_id
    if (+filters.size !== 0)
      validFilters['size'] = sizeOptions[+filters.size].value
    if (+filters.room_amount !== 0)
      validFilters['room_amount'] = roomsOptions[+filters.room_amount].value
    if (+filters.price !== 0)
      validFilters['price'] = priceOptions[+filters.price].value

    console.log(JSON.stringify(validFilters, null, 2))
    writeFilters({
      ...validFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      house_id: null,
      size: 0,
      room_amount: 0,
      price: 0,
    })
    writeFilters({})
  }

  console.log(filters)

  return (
    <>
      <Flex>
        {/* <CustomInlineFormInput value={filters?.complex ?? ''} setValue={(value) => setFilters({...filters, name: value})}
          id='complex' inputType={'text'} name='Название' regexCheck={(value: string) => isLettersOnly(value)}
        /> */}
        <CustomInlineFormInput value={filters?.house_id ?? ''} setValue={(value) => setFilters({...filters, house_id: value ?? null})} 
          id='house' inputType={'text'} name='Дом'  regexCheck={(value: string) => isNumbersOnly(value)}
        />
        <CustomInlineFromSelector
          value={+filters.size} options={sizeOptions} id='size' name='Кв.м.'
          setValue={(size_id: number) => setFilters({...filters, size: size_id})}
        />
        <CustomInlineFromSelector
          value={+filters.room_amount} options={roomsOptions} id='room_amount' name='Комнат'
          setValue={(room_id: number) => setFilters({...filters, room_amount: room_id})}
        />
        <CustomInlineFromSelector
          value={+filters.price} options={priceOptions} id='price' name='Цена'
          setValue={(price_id: number) => setFilters({...filters, price: price_id})}
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


const EsateTableData: React.FC<ITableData> = memo(({currentPage,data,onNextPage,onPrevPage,openModal,selected,setSelected,totalPages}) => {
  const [user,] = useAtom(readUser)

  return (
    <Flex flexDirection={'column'} maxW={'85rem'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База объектов
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        { data && currentPage && <>
          {user.role == UserRole.ADMIN && <>
            <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
              <Button color={'black'} _hover={{bg: 'gray.400'}} variant='outline' onClick={() => openModal()}>
                Создать нового объекта
              </Button>
            </Flex>
          </>}
          <ComplexesFilterData />
          <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
            <TableView selected={selected} setSelected={setSelected} config={{
              headers: ['Адресс', 'Номер квартиры', 'Комнаты', 'Этаж', 'Площадь'],
              body: data ? data.map((d: any) => [d.house.street, d.flat, d.room_amount, d.floor, d.size]) : [],
              foot: []
            }} />
          </Box>
          <Pagination currentPage={currentPage} totalPages={totalPages} onNext={onNextPage} onPrevious={onPrevPage} />
        </>}
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

  const [estateFilters,] = useAtom(readFilterEstate)

  const [disableDelete, setDisableDelete] = useState(false) 

  const { data: estatesPageData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getFlatesByPage'], {
      currentPage: currentPage
    }],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getFlatesByPage(currentPage, 10, estateFilters)
      setMaxPage(result.count > 0 ? Math.ceil(result.count / 10) : 1)
      return result
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setEstate(null)
    setCurrentPage(1)
    refetch()
    console.log(JSON.stringify(estateFilters, null, 2))
    queryClient.invalidateQueries({
      predicate: (query) =>
        //@ts-ignore
        query.queryKey[0] === QUERY_KEYS['getFlatesByPage'] && query.queryKey[1]?.currentPage > 1,
    })
  }, [estateFilters])

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

    const newEstateData = structuredClone(clientData)
    newEstateData[key] = value

    //@ts-ignore
    const result = await window.invokes.updateFlat(newEstateData)
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

  const onDeleteEstate = async (id: number) => {
    setDisableDelete(true)
    //@ts-ignore
    const resultDel = await window.invokes.deleteFlat(id)
    if (resultDel) {
      setEstate(null)
      refetch()
      queryClient.invalidateQueries({
        predicate: (query) =>
          //@ts-ignore
          query.queryKey[0] === QUERY_KEYS['getFlatesByPage'] && query.queryKey[1]?.currentPage > currentPage,
      })
    }
    setDisableDelete(false)
  }

  const onCreateNewEstate = async () => {
      setCurrentPage(prev => maxPage)
      refetch()
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
      <Flex width={'100%'} overflowY={'hidden'} overflowX={'hidden'}>
        <EsateTableData
          currentPage={currentPage}
          totalPages={maxPage}
          data={estatesPageData.flats ?? []}
          selected={estate}
          onNextPage={() => {
            setCurrentPage(prev => prev + 1)
          }}
          onPrevPage={() => {
            setCurrentPage(prev => prev - 1)
          }}
          openModal={openEstateModal}
          setSelected={setEstate}
        />
        {clientData ? <>
          {user.role == UserRole.ADMIN ? <>
            <ItemInfoAdmin
              onDeleteEstate={onDeleteEstate}
              onChangeEstate={onUpdateEstate}
              config={{
                ...clientData,
                adress: `${clientData.house.street} ${clientData.house.house_number}`,
              }}
              disableDelete={disableDelete}
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