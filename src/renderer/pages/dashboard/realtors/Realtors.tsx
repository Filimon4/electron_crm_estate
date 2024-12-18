import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import React, { memo, useEffect, useMemo, useState } from 'react'
import Pagination from '../../../components/global/Pagination/Pagination'
import TableView from '../../../components/layout/ItemTable/TableView'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { readRealtor, readUser, writeRealtor } from '../../../shared/store'
import EmptyItem from '../../../components/layout/ItemTable/EmptyItem'
import CreateRealtorModal from '../../../components/modals/RealtorModal/RealtorModal'
import RealtorInfoAdmin from '../../../components/layout/ItemTable/RealtorInfo/RealtorInfoAdmin'
import { notifyConfig } from '../../../shared/events/notifies.config'
import { QUERY_KEYS, queryClient } from '../../../shared/lib/queryClient'

interface IClientTableData {
  realtor: any
  data: any[]
  openRealtorModal: (...args: any) => void
  totalPages: number
  currentPage: number
  onNextPage: () => void
  onPrevPage: () => void
}

const RealtorTableData: React.FC<IClientTableData> = memo(({ realtor, data, openRealtorModal, totalPages, currentPage, onNextPage, onPrevPage }) => {
  const [,setRealtor] = useAtom(writeRealtor)
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100%'} gridArea={'col1'} justify={'space-between'}>
      <Heading fontSize={'2xl'}>
        База риелторов
      </Heading>
      <Flex height={'70%'} justify={'space-between'} flexDirection={'column'} mb={'5px'}>
        <Flex width={'100%'} justifyContent={'end'} alignItems={'center'} paddingBottom={'20px'}>
          <Button color={'black'} _hover={{ bg: 'gray.400' }} variant='outline' onClick={openRealtorModal}>
            Создать нового риелтора
          </Button>
        </Flex>
        <Box overflowY={'scroll'} overflowX={'hidden'} height={'100%'}>
          <TableView
            selected={realtor}
            setSelected={setRealtor}
            config={{
              headers: ['Фамилия', 'Имя', 'Отчество', 'Телефон', 'Почта'],
              body: data ? data.map((d: any) => [d.sure_name, d.first_name, d.last_name, d.phone, d.email]) : [],
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

const Realtors = () => {
  const { isOpen: isRealtorModal, onOpen: openRealtorModal, onClose: closeRealtorModal } = useDisclosure();
  const [realtor, __] = useAtom(readRealtor)
  const [_, setRealtor] = useAtom(writeRealtor)

  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { data: realtorPageData, isError, isLoading, isPlaceholderData, refetch } = useQuery({
    //@ts-ignore
    queryKey: [QUERY_KEYS['getRealtorsByPage'], currentPage],
    queryFn: async () => {
      //@ts-ignore
      const result = await window.invokes.getRealtorsByPage(currentPage, 10)
      setMaxPage(Math.ceil(result.count / 10))
      return result
    },
    placeholderData: keepPreviousData,
  });

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
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
    } 
  }
  const onDeleteRealtor = async (id: number) => {
    //@ts-ignore
    const resultDel = await window.invokes.deleteRealtor(id)
    if (resultDel) {
      setRealtor(null)
    }
  }
  const onCreateNewRealtor = async () => {
    console.log('create new client')
    setCurrentPage(prev => maxPage)
    queryClient.invalidateQueries({
      //@ts-ignore
      queryKey: [QUERY_KEYS['getClientsByPage'], maxPage],
      exact: true,
      refetchType: 'active'
    })
  }

  const realtorData = useMemo(() => {
    if (realtor !== undefined && realtor !== null && realtorPageData) {
      return realtorPageData?.realtors[realtor]
    }
    return null
  }, [realtor])
  
  return (
    <>
      <Flex width={'100%'} overflow={'scroll'}>
        {realtorPageData && currentPage && <>
          <RealtorTableData
            currentPage={currentPage} totalPages={maxPage}
            data={realtorPageData.realtors ?? []}
            realtor={realtor} onNextPage={() => {
              setCurrentPage(prev => prev + 1)
            }}
            onPrevPage={() => {
              setCurrentPage(prev => prev - 1)
            }}
            openRealtorModal={openRealtorModal}
          />
        </>}
        {realtorData ?
          <RealtorInfoAdmin
            onChangeEstate={onUpdateRealtor}
            config={{
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