import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { HTMLInputTypeAttribute } from 'react'

const FormInput = ({id, name, inputType}: {id: string, name: string, inputType: HTMLInputTypeAttribute}) => {
  return (
    <FormControl id={id} mb='4'>
      <FormLabel>{name}</FormLabel>
      <Input
        type={inputType}
      />
      {/* {errors.email && <Text color="red.500">{errors.email.message}</Text>} */}
    </FormControl>
  )
}

export default FormInput