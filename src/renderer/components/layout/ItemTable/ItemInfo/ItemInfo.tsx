import React from 'react'
import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, GridItem, Heading, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'

const ItemInfo = ({config}: {config: any}) => (
  <Flex
    height={"100%"}
    minWidth={'400px'}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardBody>
      <Flex flexDirection={'column'} height={'100%'}>
        <Stack divider={<StackDivider />} spacing='3'>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Номер кв-ры
            </Heading>
            <Text fontSize='sm'>
              {config.flat}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Этаж
            </Heading>
            <Text fontSize='sm'>
              {config.floor}
            </Text>
          </Flex>
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
              {config.size}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Комнаты
            </Heading>
            <Text fontSize='sm'>
              {config.room_amount}
            </Text>
          </Flex>
        </Stack>
        <Textarea value={config.description} mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}} />
      </Flex>
    </CardBody>
    {config.price && <>
      <Divider />
      <CardFooter>
          <Text color={'blackAlpha.600'} fontSize={"2xl"}>
            {config.price} р.
          </Text>
      </CardFooter>
    </>}
    </Card>
  </Flex>
)

export default ItemInfo