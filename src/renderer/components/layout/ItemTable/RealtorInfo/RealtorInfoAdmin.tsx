import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Stack, StackDivider, Textarea } from '@chakra-ui/react'
import { isEmailValid, isLettersOnly, isNumbersOnly } from '../../../../shared/utils/form'
import EditableInput from '../../../global/EditableInput/EditableInput'
import { useAtom } from 'jotai'
import { readUser } from '../../../../shared/store'
import PasswordModal from '../../../../components/modals/InputModal/PasswordModal/PasswordModal'
import { tableMaxField } from '../../../../shared/utils/utils'

const RealtorInfo = ({
  config,
  onChangeRealtor,
  onDeleteRealtor
}: {
  config: any,
  onChangeRealtor: (key: string, value: string) => void,
  onDeleteRealtor: () => void
}) => {
  const [user,] = useAtom(readUser)
  const [isPasswordOpen, setPasswordModal] = useState(false)

  const resetPassword = (input: string) => {
    //@ts-ignore
    window.invokes.resetPassword(user.id, config.id, input)
  }  

  return (
    <>
      <Flex
        height={"100%"}
        minWidth={'400px'}
      >
        <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
        <CardHeader>
          <Heading>{config.title}</Heading>
        </CardHeader>
        <CardBody>
          <Flex flexDirection={'column'} height={'100%'}>
            <Stack divider={<StackDivider />} spacing='3'>
              <EditableInput
                inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
                onChangeData={onChangeRealtor} editValue='sure_name' title={'Фамилия'} defaultValue={tableMaxField(config.sure_name)}
              />
              <EditableInput
                inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
                onChangeData={onChangeRealtor} editValue='first_name' title={'Имя'} defaultValue={tableMaxField(config.first_name)}
              />
              <EditableInput
                inputValidator={(value) => isLettersOnly(value)} submitValidator={(value) => Boolean(value)}
                onChangeData={onChangeRealtor} editValue='last_name' title={'Отчество'} defaultValue={tableMaxField(config.last_name)}
              />
              <EditableInput
                inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)}
                onChangeData={onChangeRealtor} editValue='phone' title={'Телефон'} defaultValue={tableMaxField(config.phone)}
              />
              <EditableInput
                inputValidator={(value) => isEmailValid(value)} submitValidator={(value) => Boolean(value)}
                onChangeData={onChangeRealtor} editValue='email' title={'Почта'} defaultValue={tableMaxField(config.email)}
              />
              
            </Stack>
            <Textarea value={config.description} mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}} />
          </Flex>
        </CardBody>
        <CardFooter>
          <Flex direction={'column'} width={'100%'} gap={'2px'}>
            <Flex width={'100%'}>
              <Button
                width={'100%'}
                onClick={async () => {
                  setPasswordModal(true)
                }}
                colorScheme={'orange'}
              >
                Изменить пароль
              </Button>
            </Flex>
            <Flex width={'100%'}>
              <Button
                width={'100%'}
                onClick={onDeleteRealtor}
                colorScheme={'red'}
              >
                Удалить
              </Button>
            </Flex>
          </Flex>
        </CardFooter>
        </Card>
      </Flex>
      <PasswordModal isOpen={isPasswordOpen} onClose={() => setPasswordModal(false)} onSave={(input: string) => {resetPassword(input);setPasswordModal(false)}} />
  </>
)}

export default RealtorInfo