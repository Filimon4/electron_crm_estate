import { Avatar, Box, Flex, Heading, HStack, Progress, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import React from 'react'
import ChartViewer, { DataPoint } from '../../../components/charts/VisualChart/VisualChart'
import { RealtorCard, RealtorCardList } from './components/RealtorsStat';
import StatsHeader from '../../../components/layout/stats/StatsHeader';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../shared/lib/queryClient';
import { IStatData } from '../../../shared/types/stat.types';

const Reports: React.FC = () => {

  const { data: incomeData } = 
  //@ts-ignore
  useQuery({placeholderData:keepPreviousData,queryKey:[QUERY_KEYS['incomeMonths']],queryFn:async()=>{
      //@ts-ignore
      const result = await window.invokes.incomeMonths()
      const pointData: DataPoint[] = result.map((res: any) => ({date: String(res.month),value: +res.total_income})) 
      return pointData
  }});

  const { data: daelAmountData } = 
  //@ts-ignore
  useQuery({placeholderData:keepPreviousData,queryKey:[QUERY_KEYS['dealAmountMonths']],queryFn:async()=>{
      //@ts-ignore
      const result = await window.invokes.dealAmountMonths()
      const pointData: DataPoint[] = result.map((res: any) => ({date: String(res.month),value: +res.count})) 
      return pointData
    }});
    
    const { data: avgIncomeData } = 
    //@ts-ignore
    useQuery({placeholderData:keepPreviousData,queryKey:[QUERY_KEYS['avgIncomeMonths']],queryFn:async()=>{
      //@ts-ignore
      const result = await window.invokes.avgIncomeMonths()
      const pointData: DataPoint[] = result.map((res: any) => ({date: String(res.month),value: +res.total_income})) 
      return pointData
  }});
  const { data: topRealtorsData } = 
  //@ts-ignore
  useQuery({placeholderData:keepPreviousData,queryKey:[QUERY_KEYS['topRealtors']],queryFn:async()=>{
      //@ts-ignore
      const result = await window.invokes.topRealtors()
      return result
  }});

  console.log(incomeData)

  return (
    <Flex direction="column" h="100vh" p={4} width={'100%'} overflow={'scroll'} overflowX={'hidden'}>
      <Box bg="gray.100" p={4} borderRadius="lg" mb={4}>
        {incomeData && <>
          <StatsHeader data={[
            {
              label: 'income',
              //@ts-ignore
              value: `${incomeData[0]?.value ?? 'Нет данных'}`,
              //@ts-ignore
              text: `${incomeData[1]?.value ? `${(incomeData[0]?.value/incomeData[1]?.value)*100}% от пред. месяца` : 'Нет данных'}`
            },
            {
              label: 'aver_income',
              //@ts-ignore
              value: `${avgIncomeData[0]?.value ?? 'Нет данных'}`,
              //@ts-ignore
              text: `${avgIncomeData[1]?.value ? `${(avgIncomeData[0]?.value/avgIncomeData[1]?.value)*100}% от пред. месяца` : 'Нет данных'}`
            },
            {
              label: 'deals',
              //@ts-ignore
              value: `${daelAmountData[0]?.value ?? 'Нет данных'}`,
              //@ts-ignore
              text: `${daelAmountData[1]?.value ? `${(daelAmountData[0]?.value/daelAmountData[1]?.value)*100}% от пред. месяца` : 'Нет данных'}`
            },
          ]} />
        </>}
      </Box>

      <Flex flex="1" gap={4}>
        <Box w="80%" bg="gray.100" p={4} borderRadius="lg">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Информация о сделках
          </Text>
          <ChartViewer viewData={incomeData} title='Доход по месяцам' />
          <ChartViewer viewData={daelAmountData} title='Количество сделок по месяцам' />
          <ChartViewer viewData={avgIncomeData} title='Динамика средней цены сделки' />
        </Box>
        <Box w="20%" bg="gray.100" p={4} borderRadius="lg" >
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Топ-10 риелторов
          </Text>
          <RealtorCardList data={topRealtorsData} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Reports;
