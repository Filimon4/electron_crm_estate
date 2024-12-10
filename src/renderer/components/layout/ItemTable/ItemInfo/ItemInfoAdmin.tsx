import React, { useState } from 'react'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, Editable, EditableInput, EditablePreview, Flex, GridItem, Heading, Input, Stack, StackDivider, Text, Textarea, useEditableControls } from '@chakra-ui/react'
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import { isLettersOnly, isNumbersOnly } from '../../../../shared/utils/form'

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

const ItemInfo = ({config, onChangeEstate}: {config: any, onChangeEstate: (key: string, value: string) => void}) => (
  <Flex
    height={"100%"}
    minWidth={'300px'}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardBody>
      <Flex flexDirection={'column'} height={'100%'}>
        <Stack divider={<StackDivider />} spacing='3'>
          <CardBodyItem inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'flat'} title={'Номер кв-ры'} defaultValue={config.flat} />
          <CardBodyItem inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'floor'} title={'Этаж'} defaultValue={config.floor} />
          <CardBodyItem inputValidator={(value) => true} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'adress'} title={'Адресс'} defaultValue={config.adress} />
          <CardBodyItem inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'size'} title={'Площадь'} defaultValue={config.size} />
          <CardBodyItem inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'room_amount'} title={'Комнаты'} defaultValue={config.room_amount} />
        </Stack>
        <Textarea value={config.description} mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}} />
      </Flex>
    </CardBody>
      <CardFooter>
        <Flex flexDirection={'column'} width={'100%'}>
          <Flex width={'100%'}>
            <Button
              width={'100%'}
              onClick={() => {
                //@ts-ignore
                window.context.deleteEstate(config.id)
              }}
              colorScheme={'red'}
            >
              Удалить
            </Button>
          </Flex>
          {config.price && <>
            <Divider />
              <Text color={'blackAlpha.600'} fontSize={"2xl"}>
                {config.price} р.
              </Text>
          </>}
        </Flex>
      </CardFooter>
    </Card>
  </Flex>
)

export default ItemInfo