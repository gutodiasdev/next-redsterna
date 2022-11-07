import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Icon,
  Input,
  Skeleton,
  Spinner,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import * as yup from 'yup';

import { DashboardMenu } from '../../../components/DashboardMenu';
import { api } from '../../../services/apiClient';
import { queryClient } from '../../_app';

type FormProps = {
  name: string;
  description: string;
  affiliate_scripts?: string;
  image: string;
  author: string;
};

type CreateCityFormProps = {
  userId: string;
};

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  affiliate_scripts: yup.string().optional(),
});

export default function SingleCity () {
  const router = useRouter();
  const { id } = router.query;
  const singleCityId = String(id);

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormProps>({ resolver: yupResolver(schema) });
  const toast = useToast();
  const [uploadedImage, setUploadedImage] = useState('');

  const { data, isLoading } = useQuery(['city', singleCityId], async () => {
    const { data } = await api.get(`/city/${singleCityId}`);
    return data;
  }, {
    staleTime: 1000 * 60 * 15
  });

  const mutation = useMutation(async (values: FormProps) => {
    await api.put('/city/update', values);
  }, {
    onSuccess: () => {
      toast({
        title: 'Cidade adicionada com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        onCloseComplete () {
          router.push('/dashboard/cities');
          queryClient.invalidateQueries(['city', singleCityId]);
        }
      });
    },
    onError: () => {
      toast({
        title: 'Não foi possível adicionar a cidade',
        status: 'error',
        position: 'top-right'
      });
    },

  });

  const handleCreateCity: SubmitHandler<FormProps> = async (values) => {
    mutation.mutateAsync({ ...values, image: uploadedImage, author: singleCityId, affiliate_scripts: values.affiliate_scripts?.replaceAll('\x3C', '<') });
  };

  const handleImageUpload = (file: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file[0] as File);
      api.post('/city/upload', formData)
        .then(response => {
          const { locationInS3 } = response.data;
          setUploadedImage(locationInS3);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>RedSterna - Painel Administrativo</title>
      </Head>
      <Grid
        gridTemplateColumns={'auto 1fr'}
        height={'100vh'}
      >
        <DashboardMenu />
        <Box p={'24px'} w={{ lg: '40%' }}>
          <Link href={'/dashboard/cities'}>
            <Button leftIcon={<MdOutlineKeyboardArrowLeft />} colorScheme={'red'} variant={'outline'}>
              Voltar
            </Button>
          </Link>
          {isLoading ? (
            <Box my={'32px'}>
              <Skeleton width={'200px'} height={'100px'} />
            </Box>
          ) : (
            <Box my={'32px'}>
              <Image src={data.image} alt={data.description} width={200} height={100} />
            </Box>
          )}
          <Box as='form' onSubmit={handleSubmit(handleCreateCity)}>
            <Flex flexDirection={'column'} gap={'16px'}>
              {uploadedImage !== '' ? (
                <Box overflow={'hidden'} position={'relative'}>
                  <Icon as={AiFillCloseCircle} onClick={() => setUploadedImage('')} position={'absolute'} right={'8px'} top={'8px'} color={'red'} cursor={'pointer'} backgroundColor={'white'} rounded={'full'} />
                  <Image src={uploadedImage} alt={'Imagem adicionata'} fill />
                  <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
                </Box>
              ) : (
                <FormControl>
                  <FormLabel htmlFor='image'>Imagem da cidade</FormLabel>
                  <Input type='file' onChange={(e) => handleImageUpload(e.target.files)} border='none' py={'8px'} />
                </FormControl>
              )}
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor='name'>Nome da cidade</FormLabel>
                <Input type='text' {...register('name')} defaultValue={isLoading ? '' : data.name} />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor='description'>Descrição</FormLabel>
                <Textarea {...register('description')} defaultValue={isLoading ? '' : data.description} />
                <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.affiliate_scripts}>
                <FormLabel htmlFor='affiliate_scripts'>Scripts de afiliados</FormLabel>
                <Textarea {...register('affiliate_scripts')} defaultValue={isLoading ? '' : data.affiliate_scripts} />
                <FormErrorMessage>{errors.affiliate_scripts && errors.affiliate_scripts.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Button type='submit' mt={'16px'} isLoading={mutation.isLoading} colorScheme={'red'}>
              Criar cidade
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}