import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { HTMLInputTypeAttribute } from 'react'

const FormInput = ({id, name, inputType, value, setValue}:
  {
    id: string,
    name: string,
    inputType: HTMLInputTypeAttribute,
    value: string,
    setValue: (value: string) => void | React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <FormControl id={id} mb='4'>
      <FormLabel>{name}</FormLabel>
      <Input
        value={value}
        type={inputType}
        onChange={e => setValue(e.target.value)}
      />
      {/* {errors.email && <Text color="red.500">{errors.email.message}</Text>} */}
    </FormControl>
  )
}

export default FormInput