import React from 'react'
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Editable, EditableInput, EditablePreview, Flex, GridItem, Heading, Input, Stack, StackDivider, Text, Textarea, useEditableControls } from '@chakra-ui/react'
import { CiEdit,  } from "react-icons/ci";
import { IoCheckmarkOutline, IoCloseOutline  } from "react-icons/io5";

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <Flex justifyContent='space-between' gap="10px">
      <Button padding={'2px'} {...getSubmitButtonProps()}>
        <IoCheckmarkOutline />
      </Button>
      <Button padding={'2px'} {...getCancelButtonProps()}>
        <IoCloseOutline />
      </Button>
    </Flex>
  ) : (
    <Flex justifyContent='space-between' gap="10px">
      <Button padding={'2px'} size='sm' {...getEditButtonProps()}>
        <CiEdit />
      </Button>
    </Flex>
  )
}

const CardBodyItem = ({title, defaultValue, editValue, onChangeData}: {title: string, defaultValue: string, editValue: string, onChangeData: (name: string, value: string) => void}) => {
  return (
    <Flex justify={'space-between'} direction={'column'} >
      <Heading size='xs' textTransform='uppercase'>
        {title}
      </Heading>
      <Editable
        fontSize='sm'
        textAlign='left'
        defaultValue={defaultValue}
        onSubmit={(value: string) => onChangeData(editValue, value)}
      >
        <Flex direction={'row'} justifyContent={'space-between'}>
          <Input as={EditableInput} />
          <EditablePreview />
          <EditableControls />
        </Flex>
      </Editable>
    </Flex>
  )
}

const ClientInfoAdmin = ({onChangeClient, config}: {onChangeClient: (...args: any) => void ,config: any}) => {

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
            <CardBodyItem onChangeData={onChangeClient} title={'Фамилия'} editValue={'secondName'} defaultValue={config.secondName} />
            <CardBodyItem onChangeData={onChangeClient} title={'Имя'} editValue={'firstName'} defaultValue={config.firstName} />
            <CardBodyItem onChangeData={onChangeClient} title={'Отчество'} editValue={'lastName'} defaultValue={config.lastName} />
            <CardBodyItem onChangeData={onChangeClient} title={'Телефон'} editValue={'phone'} defaultValue={config.phone} />
            <CardBodyItem onChangeData={onChangeClient} title={'Почта'} editValue={'email'} defaultValue={config.email} />
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
  </>
}

export default ClientInfoAdmin