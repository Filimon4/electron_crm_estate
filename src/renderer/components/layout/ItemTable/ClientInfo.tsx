import React from 'react'
import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, GridItem, Heading, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'

const ClientInfo = ({area, config}: {area: string, config: any}) => (
  <GridItem
    area={area}
    height={"100%"}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardHeader>
      <Heading>{config.title}</Heading>
    </CardHeader>
    <CardBody>
      <Flex flexDirection={'column'} height={'100%'}>
        <Stack divider={<StackDivider />} spacing='3'>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Адресс
            </Heading>
            <Text fontSize='sm'>
              {config.adress}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Площадь
            </Heading>
            <Text fontSize='sm'>
              {config.flatsize}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Количество комнат
            </Heading>
            <Text fontSize='sm'>
              {config.roomsAmount}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Количество сплен
            </Heading>
            <Text fontSize='sm'>
              {config.bedroomsAmount}
            </Text>
          </Flex>
        </Stack>
        <Textarea mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}}>
          {config.description}
        </Textarea>
      </Flex>
    </CardBody>
    <Divider />
    <CardFooter>
      <Text color={'blackAlpha.600'} fontSize={"2xl"}>
        {config.price} р.
      </Text>
    </CardFooter>
    </Card>
  </GridItem>
)

export default ClientInfo