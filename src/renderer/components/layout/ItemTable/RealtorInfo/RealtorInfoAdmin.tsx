import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Stack, StackDivider, Textarea } from '@chakra-ui/react'
import { isEmailValid, isLettersOnly, isNumbersOnly } from '../../../../shared/utils/form'
import EditableInput from '../../../global/EditableInput/EditableInput'

const RealtorInfo = ({config, onChangeEstate}: {config: any, onChangeEstate: (key: string, value: string) => void}) => (
  <Flex
    height={"100%"}
    minWidth={'300px'}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardHeader>
      <Heading>{config.title}</Heading>
    </CardHeader>
    <CardBody>
      <Flex flexDirection={'column'} height={'100%'}>
        <Stack divider={<StackDivider />} spacing='3'>
          <EditableInput
            inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
            onChangeData={onChangeEstate} editValue='sure_name' title={'Фамилия'} defaultValue={config.sure_name}
          />
          <EditableInput
            inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
            onChangeData={onChangeEstate} editValue='first_name' title={'Имя'} defaultValue={config.first_name}
          />
          <EditableInput
            inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
            onChangeData={onChangeEstate} editValue='last_name' title={'Отчество'} defaultValue={config.last_name}
          />
          <EditableInput
            inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)}
            onChangeData={onChangeEstate} editValue='phone' title={'Телефон'} defaultValue={config.phone}
          />
          <EditableInput
            inputValidator={(value) => isEmailValid(value)} submitValidator={(value) => Boolean(value)}
            onChangeData={onChangeEstate} editValue='email' title={'Почта'} defaultValue={config.email}
          />
          
        </Stack>
        <Textarea value={config.description} mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}} />
      </Flex>
    </CardBody>
    <CardFooter>
      <Flex width={'100%'}>
        <Button
          width={'100%'}
          onClick={() => {
            //@ts-ignore
            window.context.deleteClient(config.email)
          }}
          colorScheme={'red'}
        >
          Удалить
        </Button>
      </Flex>
    </CardFooter>
    </Card>
  </Flex>
)

export default RealtorInfo