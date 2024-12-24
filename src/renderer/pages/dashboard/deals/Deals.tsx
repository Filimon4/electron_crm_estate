import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { memo, useEffect, useMemo, useState } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import TableView from '../../../components/layout/ItemTable/TableView'
import { readDeal, readFilterDeal, readUser, writeDeal, writeFilterDeal } from '../../../shared/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient'
import { notifyConfig } from '../../../shared/events/notifies.config'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import { UserRole } from '../../../shared/store/types'
import CreateDealModal from '../../../components/modals/DealModal/DealModal'
import DealInfo from '../../../components/layout/ItemTable/DealInfo/DealInfo'
import DealInfoAdmin from '../../../components/layout/ItemTable/DealInfo/DealInfoAdmin'
import { ITableData } from '../../../shared/types/table.types'
import { getRussianDateFromatFromDate } from '../../../shared/utils/months'
import { CustomInlineFormInput, CustomInlineFromSelector } from '../../../components/global/FormInput/FormInput'
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6'

const priceOptions = [
  { id: 0, label: 'Все', value: [null, null]},
  { id: 1, label: '0 - 2мил.', value: [0, 2000000] },
  { id: 2, label: '2мил. - 5мил.', value: [2000000, 5000000] },
  { id: 3, label: '5мил. - 10мил.', value: [5000000, 10000000] },
  { id: 4, label: '10мил. - 30мил.', value: [10000000, 30000000] },
  { id: 5, label: '30мил.+', value: [30000000, 1000000000] },
];
const statsOptions = [
  { id: 0, label: 'Все', value: null},
  { id: 1, label: 'Открытые', value: 'open'},
  { id: 2, label: 'Закрытые', value: 'close'},
];

export const DealsFilterData = memo(() => {
  const [filters, setFilters] = useState({
    status_id: 0,
    price_id: 0
  });
  const [,writeFilters] = useAtom(writeFilterDeal)

  const applyFilters = () => {
    const validFilters: {[k in any]: any} = {}
    if (+filters.status_id !== 0)
      validFilters['status'] = statsOptions[+filters.status_id].value
    if (+filters.price_id !== 0)
      validFilters['price'] = priceOptions[+filters.price_id].value
    writeFilters({
      ...validFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      status_id: 0,
      price_id: 0
    })
    writeFilters({
      status: null,
      price: [null, null]
    })
  }

  return (
    <>
      <Flex>
        <CustomInlineFromSelector
          value={+filters.price_id} options={priceOptions} id='price_id' name='Объём'
          setValue={(price_id: number) => setFilters({...filters, price_id: price_id})}
        />
        <CustomInlineFromSelector
          value={+filters.status_id} options={statsOptions} id='status_id' name='Статус'
          setValue={(status_id: number) => setFilters({...filters, status_id: status_id})}
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

const DealsTableData: React.FC<ITableData> = memo(({ selected, data, openModal, totalPages, currentPage, onNextPage, onPrevPage, setSelected }) => {
  return (
    <Flex flexDirection={'column'} maxW={'85rem'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База сделок
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        {currentPage && <>
          <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
            <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={() => openModal()}>
              Создать новую сделку
            </Button>
          </Flex>
          <DealsFilterData />
          <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
            <TableView
              selected={selected}
              setSelected={setSelected}
              config={{
                headers: ['Дат. открытия', 'Статус', 'Телефон кл.', 'Почта кл.', 'Объём сделки'],
                body: data ? data.map((d: any) => [`${getRussianDateFromatFromDate(new Date(d.created_at))}`, d.status == 'open' ? 'открыта' : 'закрыта', d.client.phone, d.client.email, d.flat.price]) : [],
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

const Deals = () => {
  const { isOpen: isDealModal, onOpen: openDealModal, onClose: closeDealModal } = useDisclosure();
  const [deal,] = useAtom(readDeal)
  const [,setDeal] = useAtom(writeDeal)
  const [user,] = useAtom(readUser)
  const [dealFilters,] = useAtom(readFilterDeal)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [disableDelete, setDisableDelete] = useState(false)
  const [disableChange, setDisableChange] = useState(false)
  const { data: dealsPageData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getDealsByPage'], {
      currentPage: currentPage
    }],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getDealsByPage(user.id, currentPage, 10, dealFilters)
      setMaxPage(result.count > 0 ? Math.ceil(result.count / 10) : 1)
      return result
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setDeal(null)
    setCurrentPage(1)
    refetch()
    queryClient.invalidateQueries({
      predicate: (query) =>
        //@ts-ignore
        query.queryKey[0] === QUERY_KEYS['getDealsByPage'] && query.queryKey[1]?.currentPage > 1,
    })
  }, [dealFilters])

  useEffect(() => {
    setMaxPage(dealsPageData?.count ? Math.ceil(dealsPageData?.count / 10) : 1)
    setDeal(null)
  }, [])
  
  useEffect(() => {
    setDeal(null)
  }, [currentPage])

  const dealData = useMemo(() => {
    if (deal !== undefined && deal !== null && dealsPageData) {
      return dealsPageData?.deals[deal]
    }
    return null
  }, [deal, dealsPageData])

  const onUpdateDeal = async (key: string, value: string) => {
    setDisableChange(true)
    const newDealData = structuredClone(dealData)
    newDealData[key] = value
    //@ts-ignore
    const result = await window.invokes.updateDeal(newDealData)
    if (result) {
      notifyConfig.success('Сделка обновлена', {
        autoClose: 2000,
      })
      refetch()
      queryClient.invalidateQueries({
        //@ts-ignore
        predicate: (query) => query.queryKey[0] === QUERY_KEYS['avgIncomeMonths'] || query.queryKey[0] === QUERY_KEYS['incomeMonths'] || query.queryKey[0] === QUERY_KEYS['dealAmountMonths']
      })
    } else {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
    }
    setDisableChange(false)
  }
  const onDeleteDeal = async (id: number) => {
    setDisableDelete(true)
    //@ts-ignore
    const resultDel = await window.invokes.deleteDeal(id)
    if (resultDel) {
      setDeal(null)
      refetch()
      queryClient.invalidateQueries({
        predicate: (query) =>
          //@ts-ignore
          query.queryKey[0] === QUERY_KEYS['getDealsByPage'] && query.queryKey[1]?.currentPage > currentPage,
      })
    }
    setDisableDelete(false)
  }
  const onCreateNewClient = async () => {
    setCurrentPage(prev => maxPage)
    refetch()
    queryClient.invalidateQueries({
      //@ts-ignore
      queryKey: [QUERY_KEYS['getDealsByPage'], maxPage],
      exact: true,
      refetchType: 'active'
    })
  }

  return (
    <>
      <Flex width={'100%'} overflowY={'hidden'} overflowX={'hidden'}>
        <DealsTableData
          currentPage={currentPage}
          totalPages={maxPage}
          data={dealsPageData?.deals ?? []}
          selected={deal}
          onNextPage={() => {
            setCurrentPage(prev => prev + 1)
          }}
          onPrevPage={() => {
            setCurrentPage(prev => prev - 1)
          }}
          openModal={openDealModal}
          setSelected={setDeal}
        />
        {dealData ? <>
          {user.role == UserRole.ADMIN ? <>
            <DealInfoAdmin
             onChangeDeal={onUpdateDeal}
             onDeleteDeal={onDeleteDeal}
             config={dealData}
             disableDelete={disableDelete}
             disableChange={disableChange}
            />
          </> : <>
            <DealInfo config={dealData} />
          </>}
        </>
        : <>
          <EmptyItem placeholder='Выберете сделку' />
        </>}
      </Flex>
      <CreateDealModal onClose={closeDealModal} isOpen={isDealModal} refetch={onCreateNewClient} />
    </>
  )
}

export default Deals
