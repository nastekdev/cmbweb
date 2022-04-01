import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, Divider, Flex, Heading, Text, useDisclosure, Wrap } from '@chakra-ui/react';
import { MouseEvent, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';

import { BoxStatusResponse } from '../../models/BoxStatusResponse';
import { Sensor } from '../Sensor';

interface DetailBoxProps {
  selectedBox?: BoxStatusResponse;
  fromDetailBox?: () => void;
};

export function DetailBox({
  selectedBox,
  fromDetailBox
}: DetailBoxProps) {
  const [box, setBox] = useState(selectedBox);
  const [flashingLight, setFlashingLight] = useState('red.900');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  useEffect(() => {
    if (box?.solicitacao_pendente?.status === 'Pendente') {
      setInterval(run, 1000);
    }
    setBox(selectedBox);
  }, [box]);

  // window.setInterval(run, 1000);
  function run() {
    if (flashingLight === 'red.900') setFlashingLight('red.500');
    else setFlashingLight('red.900');
  }

  // window.setInterval(function () {
  //   getStatusCaixaById(selectedBox?.id)
  //     .then(response => {
  //       selectedBox = response.data;
  //     })
  //     .catch(error => {
  //       console.error(error.response);
  //     });
  // }, 3000);

  function onOpeningRequest(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    e.preventDefault();
    onOpen();
  }

  return (
    <>
      <Flex
        bg='gray.800'
        m='10px'
        h='auto'
        p='3'
        borderRadius='5px'
        justify='flex-start'
        flexDir='column'
      >
        <Flex
          h='50px'
          mb='15px'
          boxShadow='2xl' rounded='md' bgColor='gray.900'
          align='center'
          justify='center'
        >
          <Box >
            <Heading
              as='h1'
              size='md'
              isTruncated color='white'
            >
              Caixa: {selectedBox?.id}
            </Heading>
          </Box>
        </Flex>

        <Flex
          w='100%'
          h='100%'
          align='flex-start'
          justify='space-between'
        >
          <Box>
            <Text
              fontWeight='bold'
              color='whiteAlpha.800'
              textAlign='center'
            >
              LEFT
            </Text>

            <Wrap
              p='2'
              h='100%'
              maxW='700px'
              spacing='30px'
              border='0.5px solid'
              borderColor='gray.700'
              borderRadius='3px'
              justify='center'
            >
              <Sensor
                title='Sensor Ultrasonico de Porta 1'
                light={selectedBox?.ultimas_ocorrencias?.porta_p1?.status === '1' ? 'green.300' : 'red.600'}
              />

              <Sensor
                title='Sensor Ultrasonico de Porta 2'
                light={selectedBox?.ultimas_ocorrencias?.porta_p2?.status === '1' ? 'green.300' : 'red.600'}
              />

              <Sensor
                title='Sensor de Ferrolho 1'
                light={selectedBox?.ultimas_ocorrencias?.ferrolho_1?.status === '1' ? 'green.300' : 'red.600'}
              />

              <Sensor
                title='Sensor de Trava 1'
                light={selectedBox?.ultimas_ocorrencias?.trava_p1_e_p2?.status === '1' ? 'green.300' : 'red.600'}
              />

              <Sensor
                title='Sensor de Presença 1'
                light=
                {
                  selectedBox?.ultimas_ocorrencias?.presenca_1?.status === '00' ? 'red.600' :
                    selectedBox?.ultimas_ocorrencias?.presenca_1?.status === '01' ? 'green.300' : 'gray.300'
                }
              />
            </Wrap>
          </Box>

          {selectedBox?.solicitacao_pendente?.status !== 'Pendente' && <Wrap
            p='2'
            maxW='420px'
            spacing='30px'
            borderRadius='3px'
            justify='center'
          >
            <Sensor
              title='SOLICITAÇÃO DE ABERTURA'
            />
          </Wrap>
          }

          {
            selectedBox?.solicitacao_pendente?.status === 'Pendente' && <Wrap
              p='2'
              maxW='420px'
              spacing='30px'
              borderRadius='3px'
              justify='center'
            >
              <Center
                w='180px'
                h='180px'
                p='10'
                bg={flashingLight}
                fontSize='18'
                fontWeight='extrabold'
                borderRadius='100'
                textAlign='center'
                cursor='pointer'
                onClick={e => onOpeningRequest(e)}
              >
                SOLICITAÇÃO DE ABERTURA
              </Center>

              <Flex
                justifyContent='flex-start'
                alignItems='flex-start'
                flexDir='column'
              >
                <Flex >
                  <Text color='white' fontWeight='bold' mr='1'>
                    Nome do solicitante:
                  </Text>
                  <Text color='white'>
                    {selectedBox?.solicitacao_pendente?.tecnico?.nome}
                  </Text>
                </Flex>
                <Box display='flex' alignItems='center' justifyContent='flex-start'>
                  <Text color='white' fontWeight='bold' mr='1'>
                    E-mail solicitante:
                  </Text>
                  <Text color='white'>
                    {selectedBox?.solicitacao_pendente?.tecnico?.email}
                  </Text>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='flex-start'>
                  <Text color='white' fontWeight='bold' mr='1'>
                    Hora da solicitação:
                  </Text>
                  <Text color='white'>
                    {selectedBox?.solicitacao_pendente?.created_at}
                  </Text>
                </Box>
              </Flex>
            </Wrap>
          }

          <Box>
            <Text
              fontWeight='bold'
              color='whiteAlpha.800'
              textAlign='center'
            >
              RIGHT
            </Text>
            <Wrap
              p='2'
              maxW='700px'
              spacing='30px'
              border='0.5px solid'
              borderColor='gray.700'
              borderRadius='3px'
              justify='center'
            >
              <Sensor
                title='Sensor Ultrasonico de Porta 3'
                light={selectedBox?.ultimas_ocorrencias?.porta_p3?.status === '1' ? 'green.300' : 'red.600'}
              />

              <Sensor
                title='Sensor Ultrasonico de Porta 4'
                light={selectedBox?.ultimas_ocorrencias?.porta_p4?.status === '1' ? 'green.300' : 'red.600'}
              />

              <Sensor
                title='Sensor de Ferrolho 2'
                light={selectedBox?.ultimas_ocorrencias?.ferrolho_2?.status === '1' ? 'green.300' : 'red.600'}
              />

              <Sensor
                title='Sensor de Trava 2'
                light={selectedBox?.ultimas_ocorrencias?.trava_p3_e_p4?.status === '1' ? 'green.300' : 'red.600'}
              />

              <Sensor
                title='Sensor de Presença 2'
                light=
                {
                  selectedBox?.ultimas_ocorrencias?.presenca_2?.status === '00' ? 'red.600' :
                    selectedBox?.ultimas_ocorrencias?.presenca_2?.status === '01' ? 'green.300' : 'gray.300'
                }
              />
            </Wrap>
          </Box>
        </Flex>

        <Wrap
          mt='1'
          align='center'
          justify='space-around'
        >
          <Sensor
            title='Alarme de Vibração'
            light={selectedBox?.ultimos_alarmes?.alarme_vibracao?.status === '1' ? 'green.300' : 'red.600'}
          />

          <Sensor
            title='Alarme de Ferrolho'
            light={selectedBox?.ultimos_alarmes?.alarme_ferrolho?.status === '1' ? 'green.300' : 'red.600'}
          />

          <Sensor
            title='Alarme de Energia'
            light={selectedBox?.ultimos_alarmes?.alarme_energia?.status === '1' ? 'green.300' : 'red.600'}
          />

          <Sensor
            title='Alarme de Violação'
            light={selectedBox?.ultimos_alarmes?.alarme_violacao?.status === '1' ? 'green.300' : 'red.600'}
          />

          <Sensor
            title='Alarme de Temperatura'
            light={selectedBox?.ultimos_alarmes?.alarme_temperatura?.status === '1' ? 'green.300' : 'red.600'}
          />

          <Sensor
            title='Alarme de Presença'
            light={selectedBox?.ultimos_alarmes?.alarme_presenca?.status === '1' ? 'green.300' : 'red.600'}
          />

          <Sensor
            title='Alarme Solicita abertura do Cofre'
            light={selectedBox?.ultimos_alarmes?.alarme_solicitacao_abertura?.status === '1' ? 'green.300' : 'red.600'}
          />

          <Sensor
            title='Alarme de Abertura Manual via Bluetooth'
            light={selectedBox?.ultimos_alarmes?.alarme_abertura_manual?.status === '1' ? 'green.300' : 'red.600'}
          />
        </Wrap>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='lg'
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Executar Liberação de Abertura
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>Confirma a solicitação de abertura para a seguinte Caixa:</Text>
              <br />
              <Text>{selectedBox?.id}</Text>
            </AlertDialogBody>

            <Divider />

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Sim
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Não
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* <Modal
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
      </Modal> */}
    </>
  );

}
