import { Avatar, Box, Card, CardBody, CardHeader, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import React from "react";

export interface IRealtorCard {
  name: string;
  deals: number;
  revenue: number;
  phone: string;
}

export const RealtorCard: React.FC<IRealtorCard> = ({ name, phone, deals, revenue }) => (
  <Card borderWidth="1px" borderRadius="lg" mb={4}>
    <CardHeader padding={2}>
      <HStack spacing={4}>
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="gray.500">{phone}</Text>
        </Box>
      </HStack>
    </CardHeader>
    <CardBody padding={2}>
      <Box>
        <Text fontSize="sm">Сделок: {deals}</Text>
        <Text fontSize="sm" color="green.500">Доход: {revenue} Р.</Text>
      </Box>
    </CardBody>
  </Card>
);


export const RealtorCardList = ({data}: {data: any[]}) => {
  if (!data) return <></>
  return (
    <>
      {data.map((user, idx) => (
        <RealtorCard
          key={idx}
          name={`${user.first_name} ${user.sure_name[0]}. ${user.last_name[0]}.`}
          revenue={+user.total_income}
          deals={+user.total_count}
          phone={user.phone}
        />
      ))}
    </>
  )
}
