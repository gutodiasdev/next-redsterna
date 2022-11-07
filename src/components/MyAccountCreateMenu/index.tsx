import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';

export function MyAccountCreateMenu () {
  return (
    <Menu>
      <MenuButton as={Button} leftIcon={<BiPlus />} colorScheme={'red'} borderRadius={'full'}>
        Criar
      </MenuButton>
      <MenuList>
        <MenuItem>Criar Destino</MenuItem>
        <MenuItem>Criar Roteiro</MenuItem>
      </MenuList>
    </Menu>
  );
}