import { DragHandleIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { MouseEvent, useEffect, useState } from 'react';

import { DetailBox } from '../../components/DetailBox';
import { AllBoxResponse } from '../../models/AllBoxResponse';
import { BoxStatusResponse } from '../../models/BoxStatusResponse';
import { getAllCaixas, getStatusCaixaById } from '../../services/caixas/api';

export interface Box {
  code?: string;
  description?: string;
  id?: string;
  name: string;
  statusDescription?: 'SEM OCORRÊNCIA' | 'SOLICITAÇÃO PENDENTE';
  statusCode?: number;
  solicitacao_pendente?: string;
};

export interface DashboardProps {
  fromDashboard: (value: boolean) => void;
}

export function Dashboard({ fromDashboard }: DashboardProps) {
  const [menuOpened, setMenuOpened] = useState(true);

  const [registeredBoxes, setRegisteredBoxes] = useState<AllBoxResponse[]>([]);
  const [selectedBox, setSelectedBox] = useState<BoxStatusResponse>();

  /** VIEWS CONTROLS */
  const [showDetailBox, setShowBoxDetail] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMenuOpened(true);
    onOpen();

    const invokeCaixasRequest = () => {
      getAllCaixas()
        .then(response => {
          setRegisteredBoxes(response.data);
        })
        .catch(error => {
          console.error('ERRO :>> ', error);
        })
        .finally(() => {
          setIsLoading(false);
          onClose();
        });
    };

    setIsLoading(true);
    invokeCaixasRequest();
  }, []);

  function clickMenu(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    setMenuOpened(!menuOpened);
  }

  function clickBox(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, box: AllBoxResponse) {
    e.preventDefault();

    setMenuOpened(!menuOpened);

    getStatusCaixaById(box?.id)
      .then(response => {
        setSelectedBox({ ...response.data });
        setShowBoxDetail(true);
      })
      .catch(error => {
        console.error(error.response);
      });
  }

  function fromDetailBox() {
    setShowBoxDetail(!showDetailBox);
  }

  function onLogout(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    setShowBoxDetail(false);
    fromDashboard(true);
  }

  return (
    <>
      <Flex
        width='auto'
        height='100%'
        minH='100vh'
        bg='gray.700'
        flexDir='column'
      >

        <Flex
          w='99%'
          h='75px'
          m='0 auto'
          mt='5px'
          boxShadow='2xl'
          color='white'
          bg='gray.600'
          borderRadius='5px'
          align='center'
          justify='space-between'
        >
          <Flex
            h='100%'
            ml='15px'
            align='center'
            justify='flex-start'
          >
            <Menu
              isOpen={menuOpened}
            >
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                color='blackAlpha.900'
                onClick={e => clickMenu(e)}
              />
              <MenuList bg='gray.300'>
                <MenuOptionGroup defaultValue='asc' title='Caixas' type='radio'
                  fontWeight='bold'
                  fontFamily='sans-serif'
                  fontSize='18'
                  color='blackAlpha.900'
                >
                  <Divider />
                  {
                    registeredBoxes.map(box => (
                      <MenuItem
                        key={box.id}
                        icon={<DragHandleIcon />}
                        color='black'
                        onClick={e => clickBox(e, box)}
                      >
                        <Flex
                          w='auto'
                          align='center'
                          justify='space-between'
                        >
                          {box.id}
                          <Badge
                            ml='10px'
                            borderRadius='5px'
                            colorScheme={box.solicitacao_pendente ? 'red' : 'green'}>
                            {box.solicitacao_pendente ? 'Solicitação Pendente' : 'Sem solicitação'}
                          </Badge>
                        </Flex>
                      </MenuItem>
                    ))
                  }
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Flex>

          <Flex
            w='70%'
            h='100%'
            mr='15px'
            ml='15px'
            align='center'
            justify='space-between'
          >
            <Flex
              align='center'
              justify='center'
            >
              <Button
                w='100px'
                size='md'
                colorScheme='gray'
                variant='ghost'
                _hover={{
                  background: '#ccc'
                }}
              >
                Caixas
              </Button>

              <Center
                height='15px'
                width='5px'
              >
                <Divider orientation='vertical' />
              </Center>

              <Button
                w='100px'
                size='md'
                colorScheme='gray'
                variant='ghost'
                _hover={{
                  background: '#ccc'
                }}
              >
                Técnicos
              </Button>
            </Flex>

            <Flex
              h='100%'
              mr='15px'
              align='center'
              justify='center'
            >
              <Button
                colorScheme='teal'
                variant='outline'
                onClick={e => onLogout(e)}
              >
                {/* <Image
                  mr='15px'
                  borderRadius='full'
                  boxSize='35px'
                  src='https://bit.ly/dan-abramov'
                  alt='Dan Abramov'
                /> */}
                LOGOUT
              </Button>
            </Flex>
          </Flex>
        </Flex>

        {showDetailBox && <DetailBox selectedBox={selectedBox} fromDetailBox={fromDetailBox} />}

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
