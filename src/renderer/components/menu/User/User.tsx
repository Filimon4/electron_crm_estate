import { Box, Button, Center, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import LinkHash from '../../routes/LinkHash'
import { useAtom } from 'jotai'
import { readUser, writeUser } from '../../../shared/store'
import { BsThreeDotsVertical } from "react-icons/bs";

const UserMenu = () => {
  const [__, setUser] = useAtom(writeUser)
  return (
    <Menu>
      <MenuButton 
        as={Button}
        bgColor={'transparent'}
        _hover={{bg: 'gray.700'}}
        _active={{bg: 'transparent'}}
        // inlineSize={'1.5'}
        size={'sm'}
        alignSelf={'center'}
      >
        <BsThreeDotsVertical color='white'/>
      </MenuButton>
      <MenuList textColor={'black'}>
        <MenuGroup>
          <MenuItem onClick={() => setUser(null)}>Выход</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

const User = () => {
  const [user, _] = useAtom(readUser)
  return (
    <Box paddingBottom={'15px'}>
      {user ? <>
        <Flex flexDirection={'row'} justify={'space-around'}>
          <Flex flexDirection={'column'}>
            <Text>{`${user.sure_name} ${user.first_name[0]}. ${user.last_name[0]}.`}</Text>
            <Text fontSize={'12px'}>{`+${user.phone}`}</Text>
          </Flex>
          <UserMenu />
        </Flex>
      </> : <>
        <Center>
          <LinkHash to={'singin'}>Войти в аккаунт</LinkHash>
        </Center>
      </>}
    </Box>
  )
}

export default User