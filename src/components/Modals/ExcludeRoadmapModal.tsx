import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { queryClient } from '../../pages/_app';
import { api } from '../../services/apiClient';

type ExcludeAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  roadmap: string;
  queryResetId: string;
};

export function ExcludeRoadmapModal ({ isOpen, onClose, roadmap, queryResetId }: ExcludeAccountModalProps) {
  const toast = useToast();
  const router = useRouter();
  const [exclusionConfirmation, setExclusionConfirmation] = useState('');
  const { handleSubmit } = useForm();

  const apiExludeRoadmap = async () => {
    await api.delete('/roadmaps/delete', {
      params: {
        id: roadmap
      }
    });
  };

  const mutation = useMutation(apiExludeRoadmap, {
    onSuccess: () => {
      queryClient.invalidateQueries(['myDestinations', queryResetId]);
      onClose();
      router.push('/');
    }
  });

  const excludeHandler = async () => {
    try {
      if (exclusionConfirmation === 'excluir') {
        await mutation.mutateAsync();
      } else {
        toast({
          title: 'A frase precisa confirmar a exclusão',
          status: 'error'
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={'24px'}>
          <Flex as='form' flexDirection={'column'} gap={'24px'} my={'32px'} onSubmit={handleSubmit(excludeHandler)}>
            <Box>
              <Text> Você deseja realmente excluir este roteiro? Digite <span style={{ backgroundColor: '#dadada', borderRadius: '4px', padding: '0 4px' }}>excluir</span>, para validar a exclusão da sua conta.</Text>
              <Input type='text' size={'sm'} w={'300px'} mt={'16px'} onChange={(e) => setExclusionConfirmation(e.target.value)} />
            </Box>
            <Button type='submit' colorScheme={'red'} isLoading={mutation.isLoading}>
              Excluir conta
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}