import { Badge, Box, Flex, Grid, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillStar, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

type Roadmap = {
  roadmap: {
    id: string;
    author: string;
    cover: string;
    createdAt: string;
    daysOnTrip: number;
    interests: Array<string>;
    made: boolean;
    perPersonCost: string;
    rate: number;
    roadmapReview: string;
    title: string;
    triDate: string;
  },
  isOwner: () => boolean;
};

export function RoadmapItem ({ roadmap, isOwner }: Roadmap) {

  const parseBadgeContent = (content: string) => {
    switch (content) {
      case 'historical_city':
        return 'Cidade História';
        break;
      case 'modern_city':
        return 'Cidade Moderna';
        break;
      case 'beach':
        return 'Praia';
        break;
      case 'countryside':
        return 'Interior';
        break;
      case 'mountain':
        return 'Montanha';
        break;
      case 'waterfall':
        return 'Cachoeira';
        break;
      case 'camping':
        return 'Camping';
        break;
      case 'trekking':
        return 'Trekking';
        break;

      default:
        null;
        break;
    }
  };

  return (
    <Grid key={roadmap.id} gridTemplateColumns={'auto 1fr'} width={'100%'} gap={'8px'} border={'1px'} borderColor={'gray.200'} borderRadius={'lg'} overflow={'hidden'} _hover={{ boxShadow: 'md', transition: '275ms ease-in-out' }}
      maxWidth={'1100px'}>
      <Link href={`/roteiro/${roadmap.id}`}>
        <Box>
          <Image src={roadmap.cover} alt={roadmap.title} height={200} width={200} />
        </Box>
      </Link>
      <Grid gridTemplateColumns={'1fr auto'} p={'8px'}>
        <Link href={`/roteiro/${roadmap.id}`}>
          <Flex width={'100%'} flexDirection={'column'} justifyContent={'space-between'}>
            <Heading fontSize={'1.25rem'} fontWeight={'normal'}> {roadmap.title}</Heading>
            <Text color={'gray.500'} >{roadmap.roadmapReview.substring(0, 80)}...</Text>
            <Flex gap={'8px'} mt={'8px'}>
              {
                roadmap.interests.map((interest: string, index: number) => {
                  return (
                    <Badge key={index} rounded={'full'} fontSize={'0.6rem'} fontWeight={'normal'} colorScheme={'red'}>
                      {parseBadgeContent(interest)}
                    </Badge>
                  );
                })
              }
            </Flex>
          </Flex>
        </Link>
        <Flex flexDirection={'column'} justifyContent={'space-between'}>
          <Flex gap={'4px'} alignItems={'center'}>
            <Icon as={AiFillStar} />
            <Text>({roadmap.rate})</Text>
          </Flex>
          <Stack direction={'row'} spacing={'16px'} alignItems={'center'}>
            {isOwner() ? (
              <>
                <Link href={`/roteiro/editar/${roadmap.id}`}>
                  <Icon as={AiOutlineEdit} fontSize={'0.8rem'} />
                </Link>
                <Icon as={AiOutlineDelete} color={'red.400'} fontSize={'0.8rem'} />
              </>
            ) : null}
          </Stack>
        </Flex>
      </Grid>
    </Grid>

  );
}