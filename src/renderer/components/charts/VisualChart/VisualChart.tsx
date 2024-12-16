import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Select,
  HStack,
  Input,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getMonthNameFromDate } from '../../../shared/utils/months';

export type DataPoint = {
  value: number;
  date: string;
};
// Пример данных
const data: DataPoint[] = [
  { value: 400, date: '2024-01-01' },
  { value: 300, date: '2024-02-01' },
  { value: 200, date: '2024-03-01' },
  { value: 278, date: '2024-04-01' },
  { value: 189, date: '2024-05-01' },
];

const filteredData = (data: DataPoint[], startDate?: string, endDate?: string): (DataPoint & { name: string })[] => {
  return data
    .filter((item) => {
      const itemDate = new Date(item.date).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;
      return (!start || itemDate >= start) && (!end || itemDate <= end);
    })
    .map((item) => {
      const monthName = getMonthNameFromDate(new Date(item.date));
      return { ...item, name: monthName.slice(0, 3) };
    });
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA46BE'];

// Компонент переключателя графиков
interface ChartSwitcherProps {
  chartType: string;
  setChartType: (type: string) => void;
}

const ChartSwitcher: React.FC<ChartSwitcherProps> = ({ chartType, setChartType }) => {
  return (
    <HStack spacing={3}>
      <Select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        width="200px"
      >
        <option value="line">Линейный график</option>
        <option value="bar">Гистограмма</option>
        <option value="pie">Круговая диаграмма</option>
      </Select>
    </HStack>
  );
};

const ChartViewer = ({title}: {title: string}) => {
  const [chartType, setChartType] = useState<string>('line');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const chartData = filteredData(data, startDate, endDate)

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line animationDuration={100} type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar animationDuration={100} dataKey="value" fill="#82ca9d" />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie animationDuration={100} data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <Box p={5} width={'100%'}>
      <Heading textAlign={'center'} size={'md'} paddingBlock={'3'}>
        {title}
      </Heading>
      <VStack spacing={5} align="stretch">
        <Flex justify="space-between" align="center" >
          <ChartSwitcher chartType={chartType} setChartType={setChartType} />
          <HStack spacing={3}>
            <Input
              type="date"
              placeholder="Начальная дата"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Конечная дата"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </HStack>
        </Flex>

        <Flex w="100%" h="400px" justify="center" align="center" bg="white" p={5} borderRadius="md">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ChartViewer;