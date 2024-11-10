import React from 'react'
import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, GridItem, Heading, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'

const EmptyItem = ({area}: {area: string}) => (
  <GridItem
    area={area}
    height={"100%"}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardHeader>
    </CardHeader>
    <CardBody height={'100%'}>
      <Center justifyContent={'center'} alignItems={'center'} height={'100%'}>Выберете клиента</Center>
    </CardBody>
    <CardFooter>
    </CardFooter>
    </Card>
  </GridItem>
)

export default EmptyItem