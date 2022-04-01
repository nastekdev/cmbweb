import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';

import { Dashboard } from './Dashboard';
import { Login } from './Login';

export function Home() {

  const [showLoginPage, setShowLoginPage] = useState(true);
  const [showDashboardPage, setShowDashboardPage] = useState(false);

  function fromLoginPage(value: boolean) {
    setShowLoginPage(false);
    setShowDashboardPage(value);
  }

  function fromDashboardPage(value: boolean) {
    setShowLoginPage(value);
    setShowDashboardPage(false);
  }

  return (
    <>
      {showLoginPage && <Login fromLoginPage={fromLoginPage} />}

      {showDashboardPage && <Dashboard fromDashboard={fromDashboardPage} />}
    </>
  );

}
