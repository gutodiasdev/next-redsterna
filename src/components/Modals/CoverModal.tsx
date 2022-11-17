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

export function CoverModal ({ isOpen, onClose, avatarSource, user }: AvatarModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [coverImage, setCoverImage] = useState('');
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
      new Compressor(file[0] as File, {
        quality: 0.75,
        success (result) {
          const formData = new FormData();
          formData.append('file', result);
          api.post('/upload', formData, config)
            .then(response => {
              const { source } = response.data;
              setCoverImage(source);
            });
        }
      });
      setIsSending(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateAvatar = async () => {
    await api.put('/user/update/pictures', {
      cover: coverImage
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
      queryClient.invalidateQueries(['user', user]);
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
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={'24px'}>
          <Flex justifyContent={'center'} flexDirection={'column'} pb={'16px'}>
            <Box as='form' onSubmit={handleSubmit(updateHandler)}>
              <FormControl>
                <FormLabel
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  margin={'0 auto'}
                  border={'1px'}
                  borderColor={'gray.400'}
                  borderStyle={'dashed'}
                  borderRadius={'lg'}
                  height={'200px'}
                  width={'500px'}
                  cursor={isSending ? 'progress' : 'pointer'}
                  opacity={isSending ? 0.5 : 1}
                  backgroundColor={'white'}
                >
                  {
                    coverImage && !isSending ? (
                      <Box width={500} height={200} borderRadius={'lg'} overflow={'hidden'} position={'relative'} >
                        <Icon as={AiFillCloseCircle} position={'absolute'} zIndex={99} color={'red'} right={1} top={1} backgroundColor={'white'} borderRadius={'full'} />
                        <Image src={coverImage} alt='roadmap cover' fill style={{ objectFit: 'cover' }} />
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
              <Button type='submit' isLoading={mutation.isLoading} colorScheme={'red'} float={'right'} mt={'24px'}>
                Salvar
              </Button>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}