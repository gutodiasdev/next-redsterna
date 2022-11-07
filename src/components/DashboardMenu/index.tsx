import { As, Flex, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { TbBeach } from 'react-icons/tb';

type DashboardMenuItemProps = {
  icon: As<any>;
  name: string;
  link: string;
};

function DashboardMenuItem ({ icon, name, link }: DashboardMenuItemProps) {
  return (
    <Link href={link}>
      <Flex
        gap={'16px'}
        alignItems={'center'}
      >
        <Icon as={icon} />
        {name}
      </Flex>
    </Link>
  );
}

export function DashboardMenu () {
  return (
    <Flex
      flexDirection={'column'}
      w={'250px'}
      p={'16px'}
      backgroundColor={'gray.50'}
      alignItems={'center'}
    >
      <Link href={'/dashboard'}>
        <Image src='/images/desktop/header_logo.png' alt='Redsterna logo' width={100} height={100} />
      </Link>
      <Flex
        flexDirection={'column'}
        gap={'16px'}
        py={'40px'}
      >
        <DashboardMenuItem icon={TbBeach} name={'Cidades'} link={'/dashboard/cities'} />
      </Flex>
    </Flex>
  );
}