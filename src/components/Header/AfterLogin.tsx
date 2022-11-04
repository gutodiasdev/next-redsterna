import { Avatar, Box, Button, Divider, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { AiFillBell, AiOutlinePlus } from 'react-icons/ai';

export function AfterLogin () {
  return (
    <Flex>
      <Box>
        <Button
          leftIcon={<AiOutlinePlus />}
        >
          Criar
        </Button>
      </Box>
      <Divider orientation={'vertical'} />
      <Box>
        <AiFillBell />
      </Box>
      <Divider orientation={'vertical'} />
      <Wrap>
        <WrapItem>
          <Avatar name={'Augusto Dias'} src={''} />
        </WrapItem>
      </Wrap>
    </Flex>
  );
}