import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

export function MyAccountCreateMenu () {
  return (
    <Menu>
      <MenuButton as={Button} leftIcon={<BiPlus />} colorScheme={'red'} borderRadius={'full'}>
        Criar
      </MenuButton>
      <MenuList>
        <Link href={'/novo-roteiro'}>
          <MenuItem>Criar Roteiro</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}