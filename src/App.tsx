import { ChakraProvider } from '@chakra-ui/react';

import { Home } from './pages';
import { theme } from './styles/theme';

export function App() {
  return (
    <>
      <ChakraProvider theme={theme} resetCSS={true}>
        <Home />
      </ChakraProvider>
    </>
  );
}
