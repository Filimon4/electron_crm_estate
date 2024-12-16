import { Avatar, Box, Flex, Heading, HStack, Progress, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import React from 'react'
import ChartViewer from '../../../components/charts/VisualChart/VisualChart'
import { RealtorCard, RealtorCardList } from './components/RealtorsStat';
import StatsHeader from '../../../components/layout/stats/StatsHeader';

const Reports: React.FC = () => {
  return (
    <Flex direction="column" h="100vh" p={4} width={'100%'} overflow={'scroll'} overflowX={'hidden'}>
      <Box bg="gray.100" p={4} borderRadius="lg" mb={4}>
        <StatsHeader data={null} />
      </Box>

      <Flex flex="1" gap={4}>
        <Box w="80%" bg="gray.100" p={4} borderRadius="lg">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            График доходов
          </Text>
          <ChartViewer title='Доход по месяцам' />
          <ChartViewer title='Количество сделок по месяцам' />
          <ChartViewer title='Динамика средней цены сделки' />
        </Box>
        <Box w="20%" bg="gray.100" p={4} borderRadius="lg" >
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Топ-10 риелторов
          </Text>
          <RealtorCardList />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Reports;
