import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

import { LoginRequestDTO } from '../../models/LoginRequestDTO';
import { postLogin } from '../../services/login/api';

interface LoginPageProps {
  fromLoginPage: (value: boolean) => void;
}

export function Login({ fromLoginPage }: LoginPageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  /** FORM DATA */
  const [email, setEmail] = useState('dev@nastek.com.br');
  const [senha, setSenha] = useState('123456');

  function onLogin(e: FormEvent<HTMLDivElement>) {
    e.preventDefault();

    setShowAlert(false);
    setAlertMessage('');

    if (!validateFormData()) return setShowAlert(true);

    setIsLoading(true);
    onOpen();

    const request: LoginRequestDTO = {
      email: email ?? '',
      password: senha ?? ''
    };

    postLogin(request)
      .then(response => {
        const { data } = response;
        if (data && data.user) return fromLoginPage(true);
      })
      .catch(error => {
        setAlertMessage(error.response.data);
        setShowAlert(true);
      })
      .finally(() => {
        onClose();
        setIsLoading(false);
      });
  }

  function validateFormData() {
    if (!email || !senha) {
      setAlertMessage('Email e Senha devem ser preenchidos');
      return false;
    }

    return true;
  }

  return (
    <>
      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
        flexDir='column'
        bg="blackAlpha.200"
      >

        <Image
          mb='15'
          src='fundo.png'
          alt='Logo CMB'
          objectFit='cover'
          loading='eager'
        />

        <Flex as="form"
          // w="50%"
          minW="30%"
          bg="gray.700"
          p="10"
          borderRadius="8px"
          flexDir="column"
          boxShadow='2xl'
          border="none"
          onSubmit={e => onLogin(e)}
        >
          {
            showAlert && <Alert
              mb='25px'
              colorScheme='red'
              status='error'
              variant='subtle'
              borderRadius='0.2rem'
            >
              <AlertIcon />
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <AlertTitle>Erro!</AlertTitle>
                <AlertDescription
                  fontSize='0.85rem'
                >
                  {alertMessage}
                </AlertDescription>
              </Box>
            </Alert>
          }

          <Stack>
            <FormControl isDisabled={isLoading}>
              <FormLabel
                color="whiteAlpha.700"
                htmlFor="email"
              >
                * E-mail
              </FormLabel>

              <Input
                id="email"
                type="email"
                placeholder='ex.: name@nastek.com.br'
                _placeholder={{
                  opacity: 0.1,
                  color: 'inherit',
                  fontStyle: 'italic',
                  fontSize: '0.75rem',
                }}
                focusBorderColor="gray.100"
                bg="gray.900"
                variant="filled"
                size="lg"
                color="whiteAlpha.900"
                disabled={isLoading}
                _hover={{
                  bgColor: "gray.900"
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="password"
                color="whiteAlpha.700"
              >
                * Senha
              </FormLabel>

              <Input
                id="password"
                type="password"
                focusBorderColor="gray.100"
                bg="gray.900"
                variant="filled"
                size="lg"
                color="whiteAlpha.900"
                disabled={isLoading}
                _hover={{
                  bgColor: "gray.900"
                }}
                autoComplete=''
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />
            </FormControl>
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="blue"
            size="lg"
            disabled={isLoading}
          >
            {/* {isLoading && <Spinner mr='1rem' size='xs' ></Spinner>} */}
            {isLoading ? 'Validando dados...' : 'Entrar'}
          </Button>
        </Flex>

        <Text
          fontSize="0.6rem"
          fontStyle="italic"
          textAlign="start"
        >
          Os campos marcados com o (*) são de preenchimento obrigatórios!
        </Text>
      </Flex>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        isCentered={true}
        trapFocus={false}
        variant=''
      >
        <ModalOverlay
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Spinner
            size='xl'
            color='red.900'
            thickness='0.5rem'
            speed='1s'
            emptyColor='red.800'
          />
        </ModalOverlay>
      </Modal>
    </>
  );
}
