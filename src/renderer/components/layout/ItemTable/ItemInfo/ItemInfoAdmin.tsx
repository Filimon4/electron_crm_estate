import React from 'react'
import { Button, Card, CardBody, CardFooter, Divider, Flex, Stack, StackDivider, Textarea, Text } from '@chakra-ui/react'
import { isNumbersOnly } from '../../../../shared/utils/form'
import EditableInput from '../../../global/EditableInput/EditableInput'

const ItemInfo = ({
  config,
  onChangeEstate,
  onDeleteEstate
}: {
  config: any,
  onChangeEstate: (key: string, value: string) => void,
  onDeleteEstate: (id: number) => void
}) => (
  <Flex
    height={"100%"}
    minWidth={'300px'}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardBody>
      <Flex flexDirection={'column'} height={'100%'}>
        <Stack divider={<StackDivider />} spacing='3'>
          <EditableInput inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'flat'} title={'Номер кв-ры'} defaultValue={config.flat} />
          <EditableInput inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'floor'} title={'Этаж'} defaultValue={config.floor} />
          <EditableInput inputValidator={(value) => true} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'adress'} title={'Адресс'} defaultValue={config.adress} />
          <EditableInput inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'size'} title={'Площадь'} defaultValue={config.size} />
          <EditableInput inputValidator={(value) => isNumbersOnly(value)} submitValidator={(value) => Boolean(value)} onChangeData={onChangeEstate} editValue={'room_amount'} title={'Комнаты'} defaultValue={config.room_amount} />
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
                onDeleteEstate(config.id)
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