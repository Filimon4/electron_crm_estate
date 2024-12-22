import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { memo, useEffect, useMemo, useState } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination';
import TableView from '../../../components/layout/ItemTable/TableView';
import { readComplex, readFilterComplex, readUser, writeComplex, writeFilterComplex, writeHouse } from '../../../shared/store';
import { ITableData } from '../../../shared/types/table.types';
import { notifyConfig } from '../../../shared/events/notifies.config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem';
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient';
import ComplexInfoAdmin from '../../../components/layout/ItemTable/ComplexInfo/ComplexInfoAdmin';
import CreateComplexModal from '../../../components/modals/ComplexModal/ComplexModal';
import { CustomInlineFormInput } from '../../../components/global/FormInput/FormInput';
import { isLettersOnly } from '../../../shared/utils/form';
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6';

export const ComplexesFilterData = memo(() => {
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    district: ''
  });
  const [,writeFilters] = useAtom(writeFilterComplex)

  const applyFilters = () => {
    writeFilters({
      ...filters
    })
  }

  const clearFilters = () => {
    setFilters({
      name: '',
      city: '',
      district: ''
    })
    writeFilters({
      name: '',
      city: '',
      district: ''
    })
  }

  return (
    <>
      <Flex>
        <CustomInlineFormInput value={filters?.name ?? ''} setValue={(value) => setFilters({...filters, name: value})}
          id='name' inputType={'text'} name='Название' regexCheck={(value: string) => isLettersOnly(value)}
        />
        <CustomInlineFormInput value={filters?.city ?? ''} setValue={(value) => setFilters({...filters, city: value})} 
          id='city' inputType={'text'} name='Город'  regexCheck={(value: string) => isLettersOnly(value)}
        />
        <CustomInlineFormInput value={filters?.district ?? ''} setValue={(value) => setFilters({...filters, district: value})} 
          id='district' inputType={'text'} name='Район'  regexCheck={(value: string) => isLettersOnly(value)}
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

const ComplexesTableData: React.FC<ITableData> = memo(({ selected, data, openModal, totalPages, currentPage, onNextPage, onPrevPage, setSelected }) => {
  return (
    <Flex flexDirection={'column'} maxW={'85rem'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        Комплексы
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
          <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={() => openModal()}>
            Создать новый комплекс
          </Button>
        </Flex>
        <ComplexesFilterData />
        <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
          <TableView
            selected={selected}
            setSelected={setSelected}
            config={{
              headers: ['Название', 'Город', 'Район'],
              body: data ? data.map((d: any) => [d.name, d.city, d.district]) : [],
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

const Complexes = () => {
  const { isOpen: isModal, onOpen: openDealModal, onClose: closeDealModal } = useDisclosure();
  const [copmlex,] = useAtom(readComplex)
  const [,setComplex] = useAtom(writeComplex)
  const [user,] = useAtom(readUser)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [readFilters,] = useAtom(readFilterComplex)

  const [disableDelete, setDisableDelete] = useState(false) 

  const { data: copmlexesPageData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getComplexesByPage'], {
      currentPage: currentPage
    }],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getComplexesByPage(currentPage, 10, readFilters)
      console.log(result)
      setMaxPage(result.count > 0 ? Math.ceil(result.count / 10) : 1)
      return result
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setComplex(null)
    setCurrentPage(1)
    refetch(),
    queryClient.invalidateQueries({
      predicate: (query) =>
        //@ts-ignore
        query.queryKey[0] === QUERY_KEYS['getComplexesByPage'] && query.queryKey[1]?.currentPage > 1,
    })
  }, [readFilters])

  useEffect(() => {
    setMaxPage(copmlexesPageData?.count ? Math.ceil(copmlexesPageData?.count / 10) : 1)
    setComplex(null)
  }, [])
  
  useEffect(() => {
    setComplex(null)
  }, [currentPage])

  const onUpdateComplex = async (key: string, value: string) => {
    const newComplexData = structuredClone(complexData)
    newComplexData[key] = value
    //@ts-ignore
    const result = await window.invokes.updateComplex(newComplexData)
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
  const onDeleteComplex = async (id: number) => {
    setDisableDelete(true)
    //@ts-ignore
    const resultDel = await window.invokes.deleteComplex(id)
    if (resultDel) {
      setComplex(null)
      refetch()
      queryClient.invalidateQueries({
        predicate: (query) =>
          //@ts-ignore
          query.queryKey[0] === QUERY_KEYS['getComplexesByPage'] && query.queryKey[1]?.currentPage > currentPage,
      })
    }
    setDisableDelete(false)
  }
  const onCreateNewComplex = async () => {
    setCurrentPage(prev => maxPage)
    refetch()
    queryClient.invalidateQueries({
      //@ts-ignore
      queryKey: [QUERY_KEYS['getComplexesByPage'], maxPage],
      exact: true,
      refetchType: 'active'
    })
  }

  const complexData = useMemo(() => {
    if (copmlex !== undefined && copmlex !== null && copmlexesPageData) {
      return copmlexesPageData?.complexes[copmlex]
    }
    return null
  }, [copmlex])
  

  return (
    <>
      <Flex width={'100%'} overflowY={'hidden'} overflowX={'hidden'}>
        <ComplexesTableData
          currentPage={currentPage ?? 1}
          totalPages={maxPage}
          data={copmlexesPageData?.complexes ?? []}
          selected={copmlex}
          onNextPage={() => {
            setCurrentPage(prev => prev + 1)
          }}
          onPrevPage={() => {
            setCurrentPage(prev => prev - 1)
          }}
          openModal={openDealModal}
          setSelected={setComplex}
        />
        {complexData ? <>
          <ComplexInfoAdmin
            onChangeClient={onUpdateComplex}
            onDeleteClient={onDeleteComplex}
            config={complexData}
            disableDelete={disableDelete}
          />
        </>
        : <>
          <EmptyItem placeholder='Выберете комплекс' />
        </>}
      </Flex>
      <CreateComplexModal onClose={closeDealModal} isOpen={isModal} refetch={onCreateNewComplex} />
    </>
  )
}

export default Complexes