import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Stack, StackDivider, Textarea } from '@chakra-ui/react'
import { isEmailValid, isLettersOnly, isNumbersOnly, isPhoneValid } from '../../../../shared/utils/form';
import EditableInput from '../../../global/EditableInput/EditableInput'
import { tableMaxField } from '../../../../shared/utils/utils';

const ClientInfoAdmin = ({
  onChangeClient,
  config,
  onDeleteClient,
  disableDelete,
}: {
  onChangeClient: (...args: any) => void,
  config: any,
  onDeleteClient: (id: number) => void,
  disableDelete: boolean
}) => {

  return <>
    <Flex
      height={"100%"}
      minWidth={'400px'}
    >
      <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
      <CardHeader>
        <Heading>{config.title}</Heading>
      </CardHeader>
      <CardBody>
        <Flex flexDirection={'column'} height={'100%'}>
          <Stack divider={<StackDivider />} spacing='3'>
            <EditableInput inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeClient} title={'Фамилия'} editValue={'sure_name'} defaultValue={config.sure_name} />
            <EditableInput inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeClient} title={'Имя'} editValue={'first_name'} defaultValue={config.first_name} />
            <EditableInput inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeClient} title={'Отчество'} editValue={'last_name'} defaultValue={config.last_name} />
            <EditableInput inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value) && isPhoneValid(value)} onChangeData={onChangeClient} title={'Телефон'} editValue={'phone'} defaultValue={config.phone} />
            <EditableInput inputValidator={(value) => isEmailValid(value)}submitValidator={(value) => Boolean(value)}  onChangeData={onChangeClient} title={'Почта'} editValue={'email'} defaultValue={config.email} />
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
            disabled={disableDelete}
          >
            Удалить
          </Button>
        </Flex>
      </CardFooter>
      </Card>
    </Flex>
  </>
}

export default ClientInfoAdmin