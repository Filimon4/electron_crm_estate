import React from 'react'
import { Button, ButtonGroup, Card, CardBody, CardHeader, Editable, EditableInput, EditablePreview, Flex, GridItem, Heading, Input, Stack, StackDivider, Text, Textarea, useEditableControls } from '@chakra-ui/react'
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

const CardBodyItem = ({title, defaultValue}: {title: string, defaultValue: string}) => {
  return (
    <Flex justify={'space-between'} direction={'column'} >
      <Heading size='xs' textTransform='uppercase'>
        {title}
      </Heading>
      <Editable
        fontSize='sm'
        textAlign='left'
        defaultValue={defaultValue}
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

const ClientInfoAdmin = ({config}: {config: any}) => {
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
            <CardBodyItem title={'Фамилия'} defaultValue={config.sure_name} />
            <CardBodyItem title={'Имя'} defaultValue={config.first_name} />
            <CardBodyItem title={'Отчество'} defaultValue={config.last_name} />
            <CardBodyItem title={'Телефон'} defaultValue={config.phone} />
            <CardBodyItem title={'Почта'} defaultValue={config.email} />
          </Stack>
          <Textarea value={config.description} mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}} />
        </Flex>
      </CardBody>
      </Card>
    </Flex>
  </>
}

export default ClientInfoAdmin