import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Select,
  HStack,
  Input,
  useStyleConfig
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
import { ru } from 'date-fns/locale'; // Русская локализация
import 'react-datepicker/dist/react-datepicker.css'; // Стиль для DatePicker
import DatePicker from "react-datepicker";
import './VisualChart.css'

export type DataPoint = {
  value: number;
  date: string;
};

const filteredData = (data: DataPoint[], startDate: string, endDate?: string): (DataPoint & { name: string })[] => {
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

const ChartViewer = ({title, viewData}: {title: string, viewData: DataPoint[]}) => {
  const [chartType, setChartType] = useState<string>('line');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  if (!viewData) return <></>
  const chartData = filteredData(viewData, startDate, endDate)

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend formatter={(value) => "Значение"} />
            <Line animationDuration={100} type="monotone" name={'Значение'} dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend formatter={(value) => "Значение"} />
            <Bar animationDuration={100} dataKey="value" name={'Значение'} fill="#82ca9d" />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie animationDuration={100} data={chartData} dataKey="value" nameKey="Название" cx="50%" cy="50%" outerRadius={80} label>
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
        <Flex justify="space-between" align="center">
          <ChartSwitcher chartType={chartType} setChartType={setChartType} />
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat="MM.yyyy"
            placeholderText="Начальная дата"
            locale={ru} // Устанавливаем русскую локализацию
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            dateFormat="MM.yyyy"
            placeholderText="Конечная дата"
            locale={ru} // Устанавливаем русскую локализацию
          />
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