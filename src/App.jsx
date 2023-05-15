import React from "react";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from "react-cookie";


const queryClient = new QueryClient();

function App() {

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
