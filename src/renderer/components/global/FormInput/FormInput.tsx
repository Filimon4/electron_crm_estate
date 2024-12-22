import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react'
import React, { HTMLInputTypeAttribute } from 'react'

export const CustomFormInput = ({id, name, inputType, value, setValue, regexCheck}:
  {
    id: string,
    name: string,
    inputType: HTMLInputTypeAttribute,
    value: string,
    setValue: (value: string) => void | React.Dispatch<React.SetStateAction<string>>,
    regexCheck?: (value: string) => boolean
}) => {

  const onChangeValue = (input: string) => {
    if (typeof regexCheck == 'function') {
      if (!regexCheck(input)) return
    }
    setValue(input)
  }

  return (
    <FormControl id={id} mb='4'>
      <FormLabel>{name}</FormLabel>
      <Input
        value={value}
        type={inputType}
        onChange={e => onChangeValue(e.target.value)}
      />
    </FormControl>
  )
}
export const CustomInlineFormInput = ({id, name, inputType, value, setValue, regexCheck, validCheck, inValidText}:
  {
    id: string,
    name: string,
    inputType: HTMLInputTypeAttribute,
    value: string,
    setValue: (value: string) => void | React.Dispatch<React.SetStateAction<string>>,
    regexCheck?: (value: string) => boolean,
    validCheck?: (value: string) => boolean,
    inValidText?: string
}) => {

  const onChangeValue = (input: string) => {
    if (typeof regexCheck == 'function') {
      if (!regexCheck(input)) return
    }
    setValue(input)
  }

  return (
    <>
      {validCheck !== undefined ? <>
        <FormControl id={id} flex={'1'} minW={'150px'} isInvalid={!validCheck(value)}>
          <Flex alignItems={'center'}>
            <FormLabel __css={{'textWrap': 'nowrap'}} fontSize={'sm'}>{name}</FormLabel>
            <Input
              size={'sm'}
              value={value}
              type={inputType}
              onChange={e => onChangeValue(e.target.value)}
              />
          </Flex>
          {!validCheck(value) &&
            <FormErrorMessage fontSize={'sm'}>{inValidText}</FormErrorMessage>
          }
        </FormControl>
      </> : <>
        <FormControl id={id} flex={'1'} minW={'150px'}>
          <Flex alignItems={'center'}>
            <FormLabel fontSize={'sm'}>{name}</FormLabel>
            <Input
              size={'sm'}
              value={value}
              type={inputType}
              onChange={e => onChangeValue(e.target.value)}
              />
          </Flex>
        </FormControl>
      </>}
    </>
  )
}


export const CustomInlineFromSelector = ({id, value, name, setValue, options}:
  {
    id: string,
    value: string | number,
    name: string,
    setValue: (value: string | [number, number] | number) => void | React.Dispatch<React.SetStateAction<string>>,
    options: {
      id: number,
      label: string,
    }[]
}) => {

  return (
    <FormControl id={id} flex={'1'} minW={'150px'}>
      <Flex alignItems={'center'}>
        <FormLabel fontSize={'sm'}>{name}</FormLabel>
        <Select
          value={value}
          size={'sm'}
          onChange={e => {
            setValue(e.target.value)
          }}
        >
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
      </Flex>
    </FormControl>
  )
}