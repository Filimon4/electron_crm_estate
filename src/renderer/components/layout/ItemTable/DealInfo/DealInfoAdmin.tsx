import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Stack, StackDivider, Textarea, Text } from '@chakra-ui/react'
import { isEmailValid, isLettersOnly, isNumbersOnly, isPhoneValid } from '../../../../shared/utils/form';
import EditableInput from '../../../global/EditableInput/EditableInput'
import SimpleFormField from '../../../../components/global/SimpleFormField/SimpleFormField';

const DealInfoAdmin = ({
  onChangeClient,
  config,
  onDeleteClient
}: {
  onChangeClient: (...args: any) => void,
  config: any,
  onDeleteClient: (id: number) => void
}) => {

  return <>
    <Flex
      height={"100%"}
      minWidth={'300px'}
    >
      <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
      <CardHeader>
        <Heading>Сделка</Heading>
      </CardHeader>
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
          <Textarea value={config.description ?? ''} mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}} />
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex width={'100%'}>
          <Button
            width={'100%'}
            onClick={() => {
              onDeleteClient(config.id)
            }}
            colorScheme={'red'}
          >
            Удалить
          </Button>
        </Flex>
      </CardFooter>
      </Card>
    </Flex>
  </>
}

export default DealInfoAdmin