import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Grid, Heading, Input, Select, Skeleton, Textarea } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';

type UserResponse = {
  status: string;
  user: {
    about?: string | null;
    birthdate?: string | null;
    email: string;
    gender?: string | null;
    interests: Array<string> | [];
    name: string;
    pictures?: {
      cover: string;
      profile: string;
    } | null;
    social?: {} | null;
    username: string;
  };
};

type EditProfileFormProps = {
  userId: string;
};

export function EditProfileForm ({ userId }: EditProfileFormProps) {
  const { register } = useForm();
  const [interests, setInterests] = useState<Array<string>>([]);

  const { data, isLoading } = useQuery(['user', userId], async () => {
    const { data } = await api.get<UserResponse>(`/user/${userId}`);
    return data;
  }, {
    staleTime: 1000 * 60 * 5
  });
  console.log(data);

  const handleCheck = (event: any) => {
    let updatedList = [...interests];
    if (event.target.checked) {
      updatedList = [...interests, event.target.value];
    } else {
      updatedList.splice(interests.indexOf(event.target.value), 1);
    }
    setInterests(updatedList);
  };

  return (
    <Flex as='form' my={'24px'} flexDirection={'column'} gap={'16px'} color={'gray.600'}>
      <Heading fontWeight={'normal'} textTransform={'uppercase'} color={'gray.400'} fontSize={'md'}>Dados Pessoais</Heading>
      <Box>
        Foto de Capa
      </Box>
      <Box>
        Foto de Perfil
      </Box>
      <FormControl maxWidth={'300px'}>
        <FormLabel htmlFor='name' fontWeight={'bold'}>Nome</FormLabel>
        {isLoading ? (
          <Skeleton>
            <Input type='text' placeholder={'Nome atual'} {...register('name')} size={'sm'} />
          </Skeleton>
        ) : (
          <Input type='text' placeholder={data?.user.name} {...register('name')} size={'sm'} />
        )}
      </FormControl>
      <FormControl maxWidth={'300px'}>
        <FormLabel htmlFor='username' fontWeight={'bold'}>Username</FormLabel>
        {isLoading ? (
          <Skeleton>
            <Input type='text' placeholder={'Username atual'} {...register('username')} size={'sm'} />
          </Skeleton>
        ) : (
          <Input type='text' placeholder={data?.user.username} {...register('username')} size={'sm'} />

        )}
      </FormControl>
      <FormControl maxWidth={'300px'}>
        <FormLabel htmlFor='birthdate' fontWeight={'bold'}>Date de nascimento</FormLabel>
        <Input type='date' {...register('birthdate')} size={'sm'} />
      </FormControl>
      <FormControl maxWidth={'300px'}>
        <FormLabel htmlFor='birthdate' fontWeight={'bold'}>Gênero</FormLabel>
        <Select size={'sm'}>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="NB">Não Binário</option>
          <option value="Other">Outro</option>
        </Select>
      </FormControl>
      <Heading fontWeight={'normal'} textTransform={'uppercase'} color={'gray.400'} fontSize={'md'} mt={'16px'}>Informações sobre o usuário</Heading>
      <FormControl maxWidth={'300px'}>
        <FormLabel htmlFor='about' fontWeight={'bold'}>Sobre você</FormLabel>
        {isLoading ? (
          <Skeleton>
            <Textarea {...register('about')} placeholder={'Bio atual'} />
          </Skeleton>
        ) : (
          <Textarea {...register('about')} placeholder={data?.user.about ?? ''} />
        )}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='interests' fontWeight={'bold'}>Quais dessas opções melhor descrevem essa viagem?</FormLabel>
        <Grid gridTemplateColumns={'1fr 1fr'}>
          <Checkbox
            colorScheme={'red'}
            onChange={handleCheck}
            value='historical_city'
          >
            Cidade Histórica
          </Checkbox>
          <Checkbox colorScheme={'red'} onChange={handleCheck} value='modern_city'>Cidade Moderna</Checkbox>
          <Checkbox colorScheme={'red'} onChange={handleCheck} value='beach'>Praia</Checkbox>
          <Checkbox colorScheme={'red'} onChange={handleCheck} value='countryside'>Campo</Checkbox>
          <Checkbox colorScheme={'red'} onChange={handleCheck} value='mountain'>Montanha</Checkbox>
          <Checkbox colorScheme={'red'} onChange={handleCheck} value='cachoeira'>Cachoeira</Checkbox>
          <Checkbox colorScheme={'red'} onChange={handleCheck} value='camping'>Camping</Checkbox>
          <Checkbox colorScheme={'red'} onChange={handleCheck} value='trekking'>Trekking</Checkbox>
        </Grid>
      </FormControl>
      <FormControl maxWidth={'300px'}>
        <FormLabel htmlFor='email' fontWeight={'bold'}>Email</FormLabel>
        {isLoading ? (
          <Skeleton>
            <Input type='text' placeholder={'Email atual'} {...register('email')} size={'sm'} />
          </Skeleton>
        ) : (
          <Input type='text' placeholder={data?.user.email} {...register('email')} size={'sm'} />
        )}
      </FormControl>
      <Heading fontWeight={'normal'} textTransform={'uppercase'} color={'gray.400'} fontSize={'md'} mt={'16px'}>Redes Sociais</Heading>
      <Flex gap={'24px'}>
        <FormControl maxWidth={'300px'}>
          <FormLabel htmlFor='facebook' fontWeight={'bold'}>Facebook</FormLabel>
          <Input type='text' placeholder={'Facebook atual'} {...register('facebook')} size={'sm'} />
        </FormControl>
        <FormControl maxWidth={'300px'}>
          <FormLabel htmlFor='instagram' fontWeight={'bold'}>Instagram</FormLabel>
          <Input type='text' placeholder={'Instagram atual'} {...register('instagram')} size={'sm'} />
        </FormControl>
      </Flex>
      <Flex mt={'16px'}>
        <Button colorScheme={'blue'}>
          Salvar
        </Button>
      </Flex>
    </Flex>
  );
}