import { Card, CardHeader, Text } from "@chakra-ui/react";
import { EventInput } from "@fullcalendar/core";
import React from "react";

export const TaskCard: React.FC<Omit<EventInput, 'id'>> = ({ title, startDate, endDate, allDay }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }).replace(/^0/, '');
  };

  return (
    <Card borderWidth="1px" borderRadius="lg" mb={4}>
      <CardHeader padding={2}>
        <Text fontWeight="bold">{title}</Text>
        {allDay ? (
          <Text>Весь день</Text>
        ) : (
          <>
            <Text>{`Время: ${formatTime(startDate)} - ${formatTime(endDate)}`}</Text>
          </>
        )}
      </CardHeader>
    </Card>
  );
};