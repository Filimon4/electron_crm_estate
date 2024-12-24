import { Avatar, Box, Card, CardBody, CardHeader, Checkbox, Flex, HStack, List, ListItem, Progress, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React from "react";
import { Line, Pie } from "recharts";
import { TaskCard } from "./components/Tasks";
import StatsHeader from "../../../components/layout/stats/StatsHeader";
import ChartViewer, { DataPoint } from "../../../components/charts/VisualChart/VisualChart";
import { useAtom } from "jotai";
import { readTodayEvents, readUser } from "../../../shared/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/lib/queryClient";

const Desk: React.FC = () => {
  const [user,] = useAtom(readUser)
  const [todayEvents,] = useAtom(readTodayEvents)

  const { data: incomeData } = 
  //@ts-ignore
  useQuery({placeholderData:keepPreviousData,queryKey:[QUERY_KEYS['incomeMonthsByUser']],queryFn:async()=>{
      console.log(user.id)
      //@ts-ignore
      const result = await window.invokes.incomeMonthsByUser(user.id)
      const pointData: DataPoint[] = result.map((res: any) => ({date: String(res.month),value: +res.total_income})) 
      return pointData
  }});

  const { data: daelAmountData } = 
  //@ts-ignore
  useQuery({placeholderData:keepPreviousData,queryKey:[QUERY_KEYS['dealAmountMonthsByUser']],queryFn:async()=>{
      //@ts-ignore
      const result = await window.invokes.dealAmountMonthsByUser(user.id)
      const pointData: DataPoint[] = result.map((res: any) => ({date: String(res.month),value: +res.count})) 
      return pointData
    }});
    
    const { data: avgIncomeData } = 
    //@ts-ignore
    useQuery({placeholderData:keepPreviousData,queryKey:[QUERY_KEYS['avgIncomeMonthsByUser']],queryFn:async()=>{
      //@ts-ignore
      const result = await window.invokes.avgIncomeMonthsByUser(user.id)
      const pointData: DataPoint[] = result.map((res: any) => ({date: String(res.month),value: +res.total_income})) 
      return pointData
  }});

  return (
    <Flex direction="column" h="100vh" p={4} width={'100%'} overflow={'scroll'} overflowX={'hidden'}>
      <Box bg="gray.100" p={4} borderRadius="lg" mb={4}>
        {incomeData && avgIncomeData && daelAmountData && <>
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
        <Box w="20%" bg="gray.100" p={4} borderRadius="lg" overflowY="auto">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Задачи
          </Text>
          <List spacing={3}>
            {todayEvents && todayEvents.map((task) => (
              <TaskCard key={task.id} title={task.title} startDate={task.start} endDate={task.end} allDay={task.allDay}/>
            ))}
          </List>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Desk;