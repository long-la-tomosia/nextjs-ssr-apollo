import { APOLLO_STATE_PROP_NAME, initApolloClient } from '@/lib/apolloClient';
import { useMemo } from 'react';

function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const client = useMemo(() => initApolloClient(state), [state]);

  return client;
}

export default useApollo;
