import { Flex, Heading, Input, Button, Text, Textarea } from "@chakra-ui/react"
import React from "react"
import { useState, useEffect } from "react"
import { CiEdit } from "react-icons/ci"
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5"
import { tableMaxField } from "../../../shared/utils/utils"

const EditableTextArea = ({
  defaultValue,
  editValue,
  onChangeData,
  inputValidator,
  submitValidator
}: {
  defaultValue: string,
  editValue: string,
  onChangeData: (name: string, value: string) => void,
  inputValidator?: (input: string) => boolean,
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
    <Flex justify={'space-between'} direction={'column'} height={'100%'}>
      {isEditing ? <>
        <Flex justifyContent='space-between' gap="10px" direction={'column'} height={'100%'}>
          <Textarea
            value={newValue ?? ''}
            mt={'10px'}
            border={"1px"}
            borderColor={'black'}
            height={'100%'}
            style={{resize: 'none'}}
            onChange={(e) => {
              setNewValue(e.target.value)
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
        <Flex justifyContent='space-between' gap="10px" width={'100%'} direction={'column'} height={'100%'}>
          <Textarea
            value={newValue ?? ''}
            mt={'10px'}
            border={"1px"}
            borderColor={'black'}
            height={'100%'}
            isReadOnly
            style={{resize: 'none'}}
          />
          <Button padding={'2px'} size='sm' onClick={() => setEditable(true)}>
            <CiEdit />
          </Button>
        </Flex>
      </>}
    </Flex>
  )
}

export default EditableTextArea