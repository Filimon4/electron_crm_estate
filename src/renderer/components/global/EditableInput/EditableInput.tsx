import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react"
import React from "react"
import { useState, useEffect } from "react"
import { CiEdit } from "react-icons/ci"
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5"

const EditableInput = ({
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

export default EditableInput