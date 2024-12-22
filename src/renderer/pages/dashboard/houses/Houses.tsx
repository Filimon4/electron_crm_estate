import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { memo, useEffect, useMemo, useState } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination';
import TableView from '../../../components/layout/ItemTable/TableView';
import { readFilterHouse, readHouse, readUser, writeFilterHouse, writeHouse } from '../../../shared/store';
import { ITableData } from '../../../shared/types/table.types';
import { notifyConfig } from '../../../shared/events/notifies.config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem';
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient';
import ComplexInfoAdmin from '../../../components/layout/ItemTable/ComplexInfo/ComplexInfoAdmin';
import CreateHouseModal from '../../../components/modals/HouseModal/HouseModal';
import HouseInfoAdmin from '../../../components/layout/ItemTable/HouseInfo/HouseInfoAdmin';
import { CustomInlineFormInput } from '../../../components/global/FormInput/FormInput';
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6';
import { isLettersOnly, isNumbersOnly } from '../../../shared/utils/form';

export const ComplexesFilterData = memo(() => {
  const [filters, setFilters] = useState({
    complex: null,
    street: null,
    house_number: null
  });
  const [,writeFilters] = useAtom(writeFilterHouse)

  const applyFilters = () => {
    const validFilters: {[k in any]: any} = {}
    Object.entries(filters).map(([key, v]) => {
      if (v !== null) {
        validFilters[key] = v
      }
    })
    writeFilters({
      ...validFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      complex: null,
      street: null,
      house_number: null
    })
    writeFilters({})
  }

  return (
    <>
      <Flex>
        {/* <CustomInlineFormInput value={filters?.complex ?? ''} setValue={(value) => setFilters({...filters, name: value})}
          id='complex' inputType={'text'} name='Название' regexCheck={(value: string) => isLettersOnly(value)}
        /> */}
        <CustomInlineFormInput value={filters?.street ?? ''} setValue={(value) => setFilters({...filters, street: value ?? null})} 
          id='street' inputType={'text'} name='Улица'  regexCheck={(value: string) => isLettersOnly(value)}
        />
        <CustomInlineFormInput value={filters?.house_number ?? ''} setValue={(value) => setFilters({...filters, house_number: Number(value) ?? null})} 
          id='house_number' inputType={'text'} name='Дом' regexCheck={(value: string) => isNumbersOnly(value)}
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

const HousesTableData: React.FC<ITableData> = memo(({ selected, data, openModal, totalPages, currentPage, onNextPage, onPrevPage, setSelected }) => {
  return (
    <Flex flexDirection={'column'} maxW={'85rem'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        Дома
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        {data && currentPage && <>
          <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
            <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={() => openModal()}>
              Создать новый дом
            </Button>
          </Flex>
          <ComplexesFilterData />
          <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
            <TableView
              selected={selected}
              setSelected={setSelected}
              config={{
                headers: ['Город', 'Улица', 'Ном. дома', 'Район'],
                body: data ? data.map((d: any) => [d.city, d.street, d.house_number, d.district]) : [],
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

const Complexes = () => {
  const { isOpen: isModal, onOpen: openDealModal, onClose: closeDealModal } = useDisclosure();
  const [house,] = useAtom(readHouse)
  const [,setHouse] = useAtom(writeHouse)
  const [user,] = useAtom(readUser)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [readFilters,] = useAtom(readFilterHouse)

  const [disableDelete, setDisableDelete] = useState(false)

  const { data: copmlexesPageData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getHousesByPage'], {
      currentPage: currentPage
    }],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getHousesByPage(currentPage, 10, readFilters)
      console.log(result)
      setMaxPage(result.count > 0 ? Math.ceil(result.count / 10) : 1)
      return result
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setHouse(null)
    setCurrentPage(1)
    refetch()
    queryClient.invalidateQueries({
      predicate: (query) =>
        //@ts-ignore
        query.queryKey[0] === QUERY_KEYS['getHousesByPage'] && query.queryKey[1]?.currentPage > 1,
    })
  }, [readFilters])

  useEffect(() => {
    setMaxPage(copmlexesPageData?.count ? Math.ceil(copmlexesPageData?.count / 10) : 1)
    setHouse(null)
  }, [])
  
  useEffect(() => {
    setHouse(null)
  }, [currentPage])

  const onUpdateComplex = async (key: string, value: string) => {
    const newHouseData = structuredClone(houseData)
    newHouseData[key] = value
    //@ts-ignore
    const result = await window.invokes.updateHouse(newHouseData)
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
  const onDeleteComplex = async () => {
    setDisableDelete(true)
    //@ts-ignore
    const resultDel = await window.invokes.deleteHouse(houseData.id)
    if (resultDel) {
      setHouse(null)
      refetch()
      queryClient.invalidateQueries({
        predicate: (query) =>
          //@ts-ignore
          query.queryKey[0] === QUERY_KEYS['getHousesByPage'] && query.queryKey[1]?.currentPage > currentPage,
      })
    }
    setDisableDelete(false)
  }
  const onCreateNewComplex = async () => {
    setCurrentPage(prev => maxPage)
    refetch()
    queryClient.invalidateQueries({
      //@ts-ignore
      queryKey: [QUERY_KEYS['getHousesByPage'], maxPage],
      exact: true,
      refetchType: 'active'
    })
  }

  const houseData = useMemo(() => {
    if (house !== undefined && house !== null && copmlexesPageData) {
      return copmlexesPageData?.houses[house]
    }
    return null
  }, [house])

  return (
    <>
      <Flex width={'100%'} overflowY={'hidden'} overflowX={'hidden'}>
        <HousesTableData
          currentPage={currentPage ?? 1}
          totalPages={maxPage}
          data={copmlexesPageData?.houses ?? []}
          selected={house}
          onNextPage={() => {
            setCurrentPage(prev => prev + 1)
          }}
          onPrevPage={() => {
            setCurrentPage(prev => prev - 1)
          }}
          openModal={openDealModal}
          setSelected={setHouse}
        />
        {houseData ? <>
          <HouseInfoAdmin
            onChangeClient={onUpdateComplex}
            onDeleteClient={onDeleteComplex}
            config={houseData}
            disableDelete={disableDelete}
          />
        </>
        : <>
          <EmptyItem placeholder='Выберете комплекс' />
        </>}
      </Flex>
      <CreateHouseModal onClose={closeDealModal} isOpen={isModal} refetch={onCreateNewComplex} />
    </>
  )
}

export default Complexes