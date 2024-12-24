import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import React, { memo, useEffect, useMemo, useState } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import TableView from '../../../components/layout/ItemTable/TableView'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { readFilterRealtor, readRealtor, writeFilterRealtor, writeRealtor } from '../../../shared/store'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import CreateRealtorModal from '../../../components/modals/RealtorModal/RealtorModal'
import RealtorInfoAdmin from '../../../components/layout/ItemTable/RealtorInfo/RealtorInfoAdmin'
import { notifyConfig } from '../../../shared/events/notifies.config'
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient'
import { ITableData } from '../../../shared/types/table.types'
import { CustomInlineFormInput } from '../../../components/global/FormInput/FormInput'
import { isLettersOnly, isNumbersOnly } from '../../../shared/utils/form'
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6'
import { tableMaxField } from '../../../shared/utils/utils'

export const RealtorFilterData = memo(() => {
  const [filters, setFilters] = useState({
    phone: '',
    email: '',
    first_name: '',
    sure_name: '',
    last_name: '',
  });
  const [,writeFilters] = useAtom(writeFilterRealtor)

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

const RealtorTableData: React.FC<ITableData> = memo(({ selected, setSelected, data, openModal, totalPages, currentPage, onNextPage, onPrevPage }) => {
  return (
    <Flex flexDirection={'column'} maxW={'85rem'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База риелторов
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        {data && currentPage && <>
          <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
            <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={openModal}>
              Создать нового риелтора
            </Button>
          </Flex>
          <RealtorFilterData />
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

const Realtors = () => {
  const { isOpen: isRealtorModal, onOpen: openRealtorModal, onClose: closeRealtorModal } = useDisclosure();
  const [realtor, __] = useAtom(readRealtor)
  const [_, setRealtor] = useAtom(writeRealtor)

  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [readFilters,] = useAtom(readFilterRealtor)

  const { data: realtorPageData, isError, isLoading, isPlaceholderData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getRealtorsByPage'], {
      currentPage: currentPage
    }],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getRealtorsByPage(currentPage, 10, readFilters)
      setMaxPage(Math.ceil(result.count / 10))
      return result
    },
    placeholderData: keepPreviousData,
  });

  const realtorData = useMemo(() => {
    if (realtor !== undefined && realtor !== null && realtorPageData) {
      return realtorPageData?.realtors[realtor]
    }
    return null
  }, [realtor])

  useEffect(() => {
    setRealtor(null)
    setCurrentPage(1)
    refetch()
    queryClient.invalidateQueries({
      predicate: (query) =>
        //@ts-ignore
        query.queryKey[0] === QUERY_KEYS['getRealtorsByPage'] && query.queryKey[1]?.currentPage > 1,
    })
  }, [readFilters])

  useEffect(() => {
    setMaxPage(realtorPageData?.count ? Math.ceil(realtorPageData?.count / 10) : 1)
    setRealtor(null)
  }, [])
  
  useEffect(() => {
    setRealtor(null)
  }, [currentPage])
  
  const onUpdateRealtor = async (key: string, value: string) => {
    //@ts-ignore
    const result = await window.invokes.updateRealtor(clientData)
    if (!result) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
    } else {
      notifyConfig.success('Риелтор обновлён', {
        autoClose: 2000,
      })
    } 
  }
  const onDeleteRealtor = async () => {
    //@ts-ignore
    const resultDel = await window.invokes.deleteRealtor(realtorData.id)
    if (resultDel) {
      setRealtor(null)
      refetch()
      queryClient.invalidateQueries({
        predicate: (query) =>
          //@ts-ignore
          query.queryKey[0] === QUERY_KEYS['getRealtorsByPage'] && query.queryKey[1]?.currentPage > currentPage,
      })
    }
  }
  return (
    <>
      <Flex width={'100%'} overflowY={'hidden'} overflowX={'hidden'}>
        <RealtorTableData
          setSelected={setRealtor}
          currentPage={currentPage}
          totalPages={maxPage}
          data={realtorPageData?.realtors ?? []}
          selected={realtor}
          onNextPage={() => {
            setCurrentPage(prev => prev + 1)
          }}
          onPrevPage={() => {
            setCurrentPage(prev => prev - 1)
          }}
          openModal={openRealtorModal}
        />
        {realtorData ?
          <RealtorInfoAdmin
            onChangeRealtor={onUpdateRealtor}
            onDeleteRealtor={onDeleteRealtor}
            config={{
              id: realtorData.id,
              sure_name: realtorData.sure_name,
              first_name: realtorData.first_name,
              last_name: realtorData.last_name,
              phone: realtorData.phone,
              email: realtorData.email,
              description: realtorData.description ?? '',
              password: realtorData.password
            }} 
          />
          : <>
            <EmptyItem placeholder='Выберете клиента' />
          </>}
      </Flex>
      <CreateRealtorModal onClose={closeRealtorModal} isOpen={isRealtorModal} refetch={refetch} />
    </>
  )
}

export default Realtors