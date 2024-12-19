import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { memo, useEffect, useMemo, useState } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination';
import TableView from '../../../components/layout/ItemTable/TableView';
import { readHouse, readUser, writeHouse } from '../../../shared/store';
import { ITableData } from '../../../shared/types/table.types';
import { notifyConfig } from '../../../shared/events/notifies.config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem';
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient';
import ComplexInfoAdmin from '../../../components/layout/ItemTable/ComplexInfo/ComplexInfoAdmin';
import CreateHouseModal from '../../../components/modals/HouseModal/HouseModal';

const ComplexesTableData: React.FC<ITableData> = memo(({ selected, data, openModal, totalPages, currentPage, onNextPage, onPrevPage, setSelected }) => {
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        Дома
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
          <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={() => openModal()}>
            Создать новый дом
          </Button>
        </Flex>
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
  const [house,] = useAtom(readHouse)
  const [,setHouse] = useAtom(writeHouse)
  const [user,] = useAtom(readUser)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { data: copmlexesPageData } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getHousesByPage'], currentPage],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getHousesByPage(currentPage, 10)
      console.log(result)
      setMaxPage(result.count > 0 ? Math.ceil(result.count / 10) : 1)
      return result
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setMaxPage(copmlexesPageData?.count ? Math.ceil(copmlexesPageData?.count / 10) : 1)
    setHouse(null)
  }, [])
  
  useEffect(() => {
    setHouse(null)
  }, [currentPage])

  const onUpdateComplex = async (key: string, value: string) => {
    //@ts-ignore
    const result = await window.invokes.updateHouse(complexData)
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
  const onDeleteComplex = async (id: number) => {
    //@ts-ignore
    const resultDel = await window.invokes.deleteHouse(id)
    if (resultDel) {
      setHouse(null)
    }
  }
  const onCreateNewComplex = async () => {
    setCurrentPage(prev => maxPage)
    queryClient.invalidateQueries({
      //@ts-ignore
      queryKey: [QUERY_KEYS['getHousesByPage'], maxPage],
      exact: true,
      refetchType: 'active'
    })
  }

  const complexData = useMemo(() => {
    if (house !== undefined && house !== null && copmlexesPageData) {
      return copmlexesPageData?.complexes[house]
    }
    return null
  }, [house])
  

  return (
    <>
      <Flex width={'100%'} overflow={'scroll'}>
        <ComplexesTableData
          currentPage={currentPage ?? 1}
          totalPages={maxPage}
          data={copmlexesPageData?.complexes ?? []}
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
        {complexData ? <>
          <ComplexInfoAdmin
            onChangeClient={onUpdateComplex}
            onDeleteClient={onDeleteComplex}
            config={complexData}
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