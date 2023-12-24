import { GetPokemonsDocument, useGetPokemonsQuery } from '@/__generated__/graphql'
import { addApolloState, initApolloClient } from '@/lib/apolloClient'

export default function Home() {
  const { data } = useGetPokemonsQuery()

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        {data?.pokemon_v2_pokemonspecies.map((pokemon) => (
          <div key={pokemon.id}>{pokemon.name}</div>
        ))}
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
  const client = initApolloClient();
  await client.query({ query: GetPokemonsDocument});

  return addApolloState(client, {
    props: {},
  });
};


