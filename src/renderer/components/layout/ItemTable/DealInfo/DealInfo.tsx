import React from 'react'
import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, GridItem, Heading, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'

const DealInfo = ({config}: {config: any}) => (
  <Flex
    height={"100%"}
    minWidth={'300px'}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardBody>
      <Flex flexDirection={'column'} height={'100%'}>
        <Stack divider={<StackDivider />} spacing='3'>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Клиент
            </Heading>
            <Text fontSize='sm'>
              {config.client}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Квартира 
            </Heading>
            <Text fontSize='sm'>
              {config.flat}
            </Text>
          </Flex>
          <Flex justify={'space-between'} >
            <Heading size='xs' textTransform='uppercase'>
              Риелтор
            </Heading>
            <Text fontSize='sm'>
              {config.realtor}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </CardBody>
    </Card>
  </Flex>
)

export default DealInfo