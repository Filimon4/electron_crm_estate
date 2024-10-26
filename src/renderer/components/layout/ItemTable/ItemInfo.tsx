import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Divider, GridItem, Heading, Text } from '@chakra-ui/react'

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