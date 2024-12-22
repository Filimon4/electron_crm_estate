import React from 'react'
import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, GridItem, Heading, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'
import SimpleFormField from '../../../../components/global/SimpleFormField/SimpleFormField'

const DealInfo = ({config}: {config: any}) => (
  <Flex
    height={"100%"}
    minWidth={'400px'}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardBody>
      <Flex flexDirection={'column'} height={'100%'}>
        <Stack divider={<StackDivider />} spacing='3'>
            <SimpleFormField heading={'Статус сделки'} text={config.status == 'open' ? 'открыта' : 'закрыта'}/>
            <SimpleFormField heading={'Телефон кл.'} text={config.client.phone}/>
            <SimpleFormField heading={'Почта кл'} text={config.client.email}/>
            <SimpleFormField heading={'Фио кл'} text={`${config.client.sure_name} ${config.client.first_name} ${config.client.last_name}`}/>
            <SimpleFormField heading={'Объём сделки'} text={config.flat.price}/>
            <SimpleFormField heading={'Адрес объекта'} text={`ул. ${config.flat.house.street} д. ${config.flat.house.house_number} кв. ${config.flat.flat} этаж ${config.flat.floor}`}/>
        </Stack>
      </Flex>
    </CardBody>
    </Card>
  </Flex>
)

export default DealInfo