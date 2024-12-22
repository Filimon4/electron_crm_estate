import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Stack, StackDivider, Textarea, Text } from '@chakra-ui/react'
import { isEmailValid, isLettersOnly, isNumbersOnly, isPhoneValid } from '../../../../shared/utils/form';
import EditableInput from '../../../global/EditableInput/EditableInput'
import SimpleFormField from '../../../../components/global/SimpleFormField/SimpleFormField';

const DealInfoAdmin = ({
  onChangeDeal,
  config,
  onDeleteDeal,
  disableDelete,
  disableChange
}: {
  onChangeDeal: (...args: any) => void,
  config: any,
  onDeleteDeal: (id: number) => void,
  disableDelete: boolean,
  disableChange: boolean
}) => {

  return <>
    <Flex
      height={"100%"}
      minWidth={'400px'}
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
        <Flex direction={'column'} width={'100%'} gap='2px'>  
          <Flex width={'100%'}>
            <Button
              width={'100%'}
              onClick={() => {
                if (config.status == 'open') {
                  //@ts-ignore
                  onChangeDeal('status', 'close')
                } else {
                  //@ts-ignore
                  onChangeDeal('status', 'open')
                }
              }}
              colorScheme={'orange'}
              disabled={disableChange}
            >
              {config.status == 'open' ? 'Закрыть сделку' : 'Открыть сделку'}
            </Button>
          </Flex>
          <Flex width={'100%'}>
            <Button
              width={'100%'}
              onClick={() => {
                onDeleteDeal(config.id)
              }}
              colorScheme={'red'}
              disabled={disableDelete}
            >
              Удалить
            </Button>
          </Flex>
        </Flex>
      </CardFooter>
      </Card>
    </Flex>
  </>
}

export default DealInfoAdmin