import { Avatar, Box, Card, CardBody, CardHeader, Checkbox, Flex, HStack, List, ListItem, Progress, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React from "react";
import { Line, Pie } from "recharts";
import { TaskCard, TaskItem } from "./components/Tasks";
import StatsHeader from "../../../components/layout/stats/StatsHeader";

const Desk: React.FC = () => {
  const tasks: TaskItem[] = [
    {
      id: 1,
      title: 'Важная задача',
      startDate: new Date('2024-12-16T09:00:00'),
      endDate: new Date('2024-12-16T17:00:00'),
      allDay: false
    },
    {
      id: 2,
      title: 'Оч. важная задача',
      startDate: new Date('2024-12-16T09:00:00'),
      endDate: new Date('2024-12-16T17:00:00'),
      allDay: true
    },
  ];

  return (
    <Flex direction="column" h="100vh" p={4} width={'100%'} overflow={'scroll'} overflowX={'hidden'}>
      <Box bg="gray.100" p={4} borderRadius="lg" mb={4}>
        <StatsHeader data={null} />
      </Box>
      <Flex flex="1" gap={4}>
        <Box w="80%" bg="gray.100" p={4} borderRadius="lg">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Графики
          </Text>
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