import React from "react";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from "react-cookie";

function App() {
  const queryClient = new QueryClient();

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
