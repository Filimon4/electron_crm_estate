import React from 'react'
import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, GridItem, Heading, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'

const ItemInfo = ({area, config}: {area: string, config: any}) => {
  return (
    <GridItem
      area={area}
      height={"100%"}
    >
      <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
      <CardHeader>
        <Heading>{config.title}</Heading>
      </CardHeader>
      <CardBody>
        <Flex flexDirection={'column'} height={'100%'}>
          <Stack divider={<StackDivider />} spacing='3'>
            <Flex justify={'space-between'} >
              <Heading size='xs' textTransform='uppercase'>
                Адресс
              </Heading>
              <Text fontSize='sm'>
                Где-то
              </Text>
            </Flex>
            <Flex justify={'space-between'} >
              <Heading size='xs' textTransform='uppercase'>
                Площадь
              </Heading>
              <Text fontSize='sm'>
                100 кв. м.
              </Text>
            </Flex>
            <Flex justify={'space-between'} >
              <Heading size='xs' textTransform='uppercase'>
                Количество комнат
              </Heading>
              <Text fontSize='sm'>
                4
              </Text>
            </Flex>
            <Flex justify={'space-between'} >
              <Heading size='xs' textTransform='uppercase'>
                Количество сплен
              </Heading>
              <Text fontSize='sm'>
                1
              </Text>
            </Flex>
          </Stack>
          <Textarea mt={'10px'} border={"1px"} borderColor={'black'} height={'100%'} isReadOnly style={{resize: 'none'}}>
            
          </Textarea>
        </Flex>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text color={'blackAlpha.600'} fontSize={"2xl"}>
          {config.price} р.
        </Text>
      </CardFooter>
      </Card>
    </GridItem>
  )
}

export default ItemInfo