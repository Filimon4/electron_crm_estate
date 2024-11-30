import React from 'react'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, Editable, EditableInput, EditablePreview, Flex, GridItem, Heading, Input, Stack, StackDivider, Text, Textarea, useEditableControls } from '@chakra-ui/react'
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'

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

const ItemInfo = ({config}: {config: any}) => (
  <Flex
    height={"100%"}
    minWidth={'300px'}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardBody>
      <Flex flexDirection={'column'} height={'100%'}>
        <Stack divider={<StackDivider />} spacing='3'>
          <CardBodyItem title={'Номер кв-ры'} defaultValue={config.flat} />
          <CardBodyItem title={'Этаж'} defaultValue={config.floor} />
          <CardBodyItem title={'Адресс'} defaultValue={config.adress} />
          <CardBodyItem title={'Площадь'} defaultValue={config.size} />
          <CardBodyItem title={'Комнаты'} defaultValue={config.room_amount} />
        </Stack>
        <Textarea value={config.description} mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}} />
      </Flex>
    </CardBody>
    {config.price && <>
      <Divider />
      <CardFooter>
          <Text color={'blackAlpha.600'} fontSize={"2xl"}>
            {config.price} р.
          </Text>
      </CardFooter>
    </>}
    </Card>
  </Flex>
)

export default ItemInfo