import React from 'react'
import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, GridItem, Heading, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'

const EmptyItem = ({ placeholder}: { placeholder: string}) => (
  <Flex
    height={"100%"}
    minWidth={'300px'}
  >
    <Card maxW='sm' height={"100%"} width={"100%"} maxWidth={"100%"}>
    <CardHeader>
    </CardHeader>
    <CardBody height={'100%'}>
      <Center justifyContent={'center'} alignItems={'center'} height={'100%'}>{placeholder}</Center>
    </CardBody>
    <CardFooter>
    </CardFooter>
    </Card>
  </Flex>
)

export default EmptyItem