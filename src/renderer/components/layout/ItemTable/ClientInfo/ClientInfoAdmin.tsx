import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Editable, EditableInput, EditablePreview, Flex, GridItem, Heading, Input, Stack, StackDivider, Text, Textarea, useEditableControls } from '@chakra-ui/react'
import { CiEdit,  } from "react-icons/ci";
import { IoCheckmarkOutline, IoCloseOutline  } from "react-icons/io5";
import { isEmailValid, isLettersOnly, isNumbersOnly, isPhoneValid } from '../../../../shared/utils/form';

const CardBodyItem = ({
  title,
  defaultValue,
  editValue,
  onChangeData,
  inputValidator,
  submitValidator
}: {
  title: string,
  defaultValue: string,
  editValue: string,
  onChangeData: (name: string, value: string) => void,
  inputValidator: (input: string) => boolean,
  submitValidator?: (input: string) => boolean
}) => {
  const [value, setValue] = useState(defaultValue)
  const [newValue, setNewValue] = useState(defaultValue)
  const [isEditing, setEditable] = useState(false)

  useEffect(() => {
    setValue(defaultValue)
    setNewValue(defaultValue)
  }, [defaultValue])

  const submitEdit = () => {
    if (!submitValidator(newValue)) return
    setValue(newValue)
    setEditable(false)
    onChangeData(editValue, newValue)
  }

  const cancelEdit = () => {
    setNewValue(value)
    setEditable(false)
  }

  return (
    <Flex justify={'space-between'} direction={'column'}>
      <Heading size='xs' textTransform='uppercase'>
        {title}
      </Heading>
      <Flex>
        {isEditing ? <>
          <Flex justifyContent='space-between' gap="10px">
            <Input
              type="tel"
              placeholder="Введите номер телефона"
              name={editValue}
              value={newValue}
              onChange={(e) => {
                (inputValidator(e.target.value)) && setNewValue(e.target.value)
              }}
            />
            <Button padding={'2px'} onClick={() => submitEdit()}>
              <IoCheckmarkOutline />
            </Button>
            <Button padding={'2px'} onClick={() => cancelEdit()}>
              <IoCloseOutline />
            </Button>
          </Flex>
        </> : <>
          <Flex justifyContent='space-between' gap="10px">
            <Text>{value}</Text>
            <Button padding={'2px'} size='sm' onClick={() => setEditable(true)}>
              <CiEdit />
            </Button>
          </Flex>
        </>}
      </Flex>
    </Flex>
  )
}

const ClientInfoAdmin = ({
  onChangeClient,
  config,
  onDeleteClient
}: {
  onChangeClient: (...args: any) => void,
  config: any,
  onDeleteClient: (id: number) => void}
) => {

  console.log(config)
  return <>
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
            <CardBodyItem inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeClient} title={'Фамилия'} editValue={'secondName'} defaultValue={config.sure_name} />
            <CardBodyItem inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeClient} title={'Имя'} editValue={'firstName'} defaultValue={config.first_name} />
            <CardBodyItem inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeClient} title={'Отчество'} editValue={'lastName'} defaultValue={config.last_name} />
            <CardBodyItem inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value) && isPhoneValid(value)} onChangeData={onChangeClient} title={'Телефон'} editValue={'phone'} defaultValue={config.phone} />
            <CardBodyItem inputValidator={(value) => isEmailValid(value)}submitValidator={(value) => Boolean(value)}  onChangeData={onChangeClient} title={'Почта'} editValue={'email'} defaultValue={config.email} />
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

export default ClientInfoAdmin