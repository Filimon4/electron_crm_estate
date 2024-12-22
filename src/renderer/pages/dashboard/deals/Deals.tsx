import { Box, Button, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { memo, useEffect, useMemo, useState } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import TableView from '../../../components/layout/ItemTable/TableView'
import { readDeal, readUser, writeClient, writeDeal } from '../../../shared/store'
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

const DealsTableData: React.FC<ITableData> = memo(({ selected, data, openModal, totalPages, currentPage, onNextPage, onPrevPage, setSelected }) => {
  console.log(JSON.stringify(data, null, 2))
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
  
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [disableDelete, setDisableDelete] = useState(false)
  const [disableChange, setDisableChange] = useState(false)
  const { data: dealsPageData, isError, isLoading, isPlaceholderData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getDealsByPage'], {
      currentPage: currentPage
    }],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getDealsByPage(user.id, currentPage, 10)
      setMaxPage(result.count > 0 ? Math.ceil(result.count / 10) : 1)
      return result
    },
    placeholderData: keepPreviousData,
  });

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
      notifyConfig.success('Пользователь создан', {
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
