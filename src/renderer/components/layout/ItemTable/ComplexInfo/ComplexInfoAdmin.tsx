import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Stack, StackDivider, Textarea } from '@chakra-ui/react'
import { isEmailValid, isLettersOnly, isNumbersOnly, isPhoneValid } from '../../../../shared/utils/form';
import EditableInput from '../../../global/EditableInput/EditableInput'

const ComplexInfoAdmin = ({
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
        <Heading>{config.name}</Heading>
      </CardHeader>
      <CardBody>
        <Flex flexDirection={'column'} height={'100%'}>
          <Stack divider={<StackDivider />} spacing='3'>
            <EditableInput
              inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
              onChangeData={onChangeClient} title={'Название'} editValue={'name'} defaultValue={config.name}
              />
            <EditableInput
              inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
              onChangeData={onChangeClient} title={'Город'} editValue={'city'} defaultValue={config.city}
            />
            <EditableInput
              inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
              onChangeData={onChangeClient} title={'Район'} editValue={'district'} defaultValue={config.district}
            />
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

export default ComplexInfoAdmin