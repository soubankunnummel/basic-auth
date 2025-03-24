
'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const TanstakProvider = ({ children }: { children: React.ReactNode }) => {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default TanstakProvider;
