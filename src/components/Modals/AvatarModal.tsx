import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { queryClient } from '../../pages/_app';
import { api } from '../../services/apiClient';

type AvatarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  avatarSource: string;
  user: string;
};

const ImageStyle = {
  objectFit: 'contain',
};

export function AvatarModal ({ isOpen, onClose, avatarSource, user }: AvatarModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [avatarImage, setAvatarImage] = useState('');
  const [progress, setProgress] = useState(0);
  const { handleSubmit } = useForm();

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (e: ProgressEvent) => {
      setProgress(Math.round((e.loaded * 100) / e.total));
    },
  } as AxiosRequestConfig;

  const uploadFileCallback = async (file: any) => {
    try {
      setIsSending(true);
      const formData = new FormData();
      formData.append('file', file[0] as File);
      api.post('/upload', formData, config)
        .then(response => {
          const { source } = response.data;
          setAvatarImage(source);
        });
      setIsSending(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateAvatar = async () => {
    await api.put('/user/update/pictures', {
      profile: avatarImage
    }, {
      params: {
        id: avatarSource
      }
    });
  };

  const mutation = useMutation(updateAvatar, {
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries(['account', user]);
    }
  });

  const updateHandler = async () => {
    try {
      await mutation.mutateAsync();
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent={'center'} flexDirection={'column'} pb={'16px'}>
            <Box backgroundColor={'red.500'} height={'200px'} borderRadius={'lg'}></Box>
            <Box as='form' mt={'-80px'} onSubmit={handleSubmit(updateHandler)}>
              <FormControl>
                <FormLabel
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  margin={'0 auto'}
                  border={'1px'}
                  borderColor={'gray.400'}
                  borderStyle={'dashed'}
                  borderRadius={'full'}
                  height={'200px'}
                  width={'200px'}
                  cursor={isSending ? 'progress' : 'pointer'}
                  opacity={isSending ? 0.5 : 1}
                  backgroundColor={'white'}
                >
                  {
                    avatarImage && !isSending ? (
                      <Box width={200} height={200} borderRadius={'full'} overflow={'hidden'} position={'relative'} >
                        <Icon as={AiFillCloseCircle} position={'absolute'} zIndex={99} color={'red'} right={10} top={5} backgroundColor={'white'} borderRadius={'full'} />
                        <Image src={avatarImage} alt='roadmap cover' fill style={{ objectFit: 'cover' }} />
                      </Box>
                    ) : (
                      <VStack textAlign={'center'}>
                        {isSending ? (
                          <>
                            <CircularProgress
                              trackColor="pGray.200"
                              value={progress}
                              color="orange.500"
                            >
                              <CircularProgressLabel>{progress}%</CircularProgressLabel>
                            </CircularProgress>
                            <Text as="span" pt={2} textAlign="center">
                              Enviando...
                            </Text>
                          </>
                        ) : (
                          <Input type='file' border={'none'} display={'none'} onChange={(e) => uploadFileCallback(e.target.files)} />
                        )}
                      </VStack>
                    )
                  }
                </FormLabel>
              </FormControl>
              <Button type='submit' isLoading={mutation.isLoading} colorScheme={'red'} float={'right'}>
                Salvar
              </Button>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}