import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  useToast,
  Divider
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';

type RegisterFormProps = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

const registerFormSchema = yup.object().shape({
  email: yup.string().email('Insira um email válido.').required('Email é obrigatório.'),
  name: yup.string().required('Nome é obrigatório.'),
  password: yup.string().min(6, 'Senha precisar ter no mínimo 6 caracteres.').required('Senha é obrigatório.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Deve ser igual a sua senha.').required('Confirmar senha é obrigatório.')
});

const Register = () => {
  const router = useRouter();
  const toast = useToast();
  const { signUpRedSterna } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormProps>({
    resolver: yupResolver(registerFormSchema)
  });

  const mutation = useMutation(signUpRedSterna, {
    onError: (e: AxiosError | any) => {
      toast({
        title: e.response?.data.msg,
        status: 'error',
        position: 'top-right'
      });
    },
    onSuccess: () => router.push('/minha-conta')
  });

  const handleRegister: SubmitHandler<RegisterFormProps> = (values) => {
    mutation.mutateAsync(values);
  };

  return (
    <>
      <Head>
        <title>Nova conta - RedSterna</title>
      </Head>
      <Flex
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        pt={'40px'}
      >
        <Box
          color={'gray.700'}
        >
          <Heading>
            Cadastre-se
          </Heading>
          <Text>
            Entre na rede social de viagens
          </Text>
        </Box>

        <Flex
          as='form'
          onSubmit={handleSubmit(handleRegister)}
          w={'20%'}
          flexDirection={'column'}
          textAlign={'center'}
          gap={'16px'}
          h={'100vh'}
          pt={'32px'}
        >
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor='name'>Nome</FormLabel>
            <Input
              id='name'
              {...register('name')}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              {...register('email')}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor='password'>Senha</FormLabel>
            <Input
              id='password'
              type='password'
              {...register('password')}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.passwordConfirmation}>
            <FormLabel htmlFor='passwordConfirmation'>Confirme a senha</FormLabel>
            <Input
              id='passwordConfirmation'
              type='password'
              {...register('passwordConfirmation')}
            />
            <FormErrorMessage>{errors.passwordConfirmation && errors.passwordConfirmation.message}</FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            w={'100%'}
            colorScheme={'red'}
            isLoading={mutation.isLoading}
          >
            Cadastrar nova conta
          </Button>
          <Flex alignItems={'center'} gap={'8px'}>
            <Divider />
            <Text>ou</Text>
            <Divider />
          </Flex>
          <Button
            w={'100%'}
            fontWeight={'normal'}
            border={'1px'}
            aria-label='Google login'
            leftIcon={<FcGoogle />}
            onClick={() => signIn('google')}
          >
            Cadastre-se com Google
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Register;
