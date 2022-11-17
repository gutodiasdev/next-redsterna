import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

type LoginModalProps = {
  isOpen: boolean,
  onClose: () => void;
};

type LoginProps = {
  email: string,
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().email('Por favor, insira um email válido.').required('Email é obrigatório.'),
  password: yup.string().required('Senha é obrigatório.')
});

export function LoginModal ({ isOpen, onClose }: LoginModalProps) {
  const { signIn } = useContext(AuthContext);
  const toast = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginProps>({
    resolver: yupResolver(loginSchema)
  });

  const mutationLogin = useMutation(signIn, {
    onSuccess: () => {
      toast({
        status: 'success',
        title: 'Usuário logado com sucesso'
      });
    }
  });

  const handleLogin: SubmitHandler<LoginProps> = (values) => {
    mutationLogin.mutateAsync(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset={'slideInBottom'}>
      <ModalOverlay />
      <ModalContent color={'gray.600'}>
        <ModalHeader>
          <Heading as='h3' fontSize={'2xl'}>
            Entrar
          </Heading>
          <Text fontSize={'md'} fontWeight={'normal'}>
            Entre com seu email e senha cadastrados
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as='form' onSubmit={handleSubmit(handleLogin)} display={'flex'} flexDirection={'column'} gap={'16px'}>
            <FormControl>
              <FormLabel htmlFor='login-email'>Email</FormLabel>
              <Input
                id='login-email'
                type='email'
                {...register('email')}
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='login-password'>Senha</FormLabel>
              <Input
                id='login-password'
                type='password'
                {...register('password')}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button type='submit' isLoading={isSubmitting} colorScheme={'red'}>
              Entrar
            </Button>
            {/* <Flex
              w={'100%'}
              justify={'center'}
              alignItems={'center'}
              flexDirection={'column'}
              gap={'16px'}
            >
              <Text>ou</Text>
              <Button
                w={'100%'}
                fontWeight={'normal'}
                border={'1px'}
                aria-label='Google login'
                leftIcon={<FcGoogle />}
                onClick={() => nextAuthSignIn('google')}
              >
                Continuar com Google
              </Button>
            </Flex> */}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Flex justify={'space-between'} w={'100%'} fontSize={'sm'} pb={'8px'}>
            <Link href={'/recuperar-senha'} onClick={onClose}>
              Esqueceu a senha?
            </Link>
            <Link href={'/cadastre-se'} onClick={onClose}>
              Cadastre-se
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};