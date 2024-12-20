import { Avatar, Box, Card, CardBody, CardHeader, Checkbox, Flex, HStack, List, ListItem, Progress, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React from "react";
import { Line, Pie } from "recharts";
import { TaskCard, TaskItem } from "./components/Tasks";
import StatsHeader from "../../../components/layout/stats/StatsHeader";
import ChartViewer, { DataPoint } from "../../../components/charts/VisualChart/VisualChart";
import { useAtom } from "jotai";
import { readUser } from "../../../shared/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/lib/queryClient";

const Desk: React.FC = () => {
  const tasks: TaskItem[] = [];
  const [user,] = useAtom(readUser)

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
        <StatsHeader data={null} />
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
            {tasks.map((task) => (
              <TaskCard key={task.id} title={task.title} startDate={task.startDate} endDate={task.endDate} allDay={task.allDay}/>
            ))}
          </List>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Desk;