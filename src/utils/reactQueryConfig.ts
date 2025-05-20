// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents queries from refetching on window focus by default
    },
  },
});
