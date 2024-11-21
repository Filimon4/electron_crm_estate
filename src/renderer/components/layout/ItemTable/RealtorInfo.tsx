import React from 'react'
import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, GridItem, Heading, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'

const RealtorInfo = ({area, config}: {area: string, config: any}) => (
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
              Фамилия
            </Heading>
            <Text fontSize='sm'>
              {config.sure_name}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Имя
            </Heading>
            <Text fontSize='sm'>
              {config.first_name}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Отчество
            </Heading>
            <Text fontSize='sm'>
              {config.last_name}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Телефон
            </Heading>
            <Text fontSize='sm'>
              {config.phone}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Почта
            </Heading>
            <Text fontSize='sm'>
              {config.email}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Пароль
            </Heading>
            <Text fontSize='sm'>
              {config.password}
            </Text>
          </Flex>
        </Stack>
        <Textarea value={config.description} mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}} />
      </Flex>
    </CardBody>
    </Card>
  </GridItem>
)

export default RealtorInfo