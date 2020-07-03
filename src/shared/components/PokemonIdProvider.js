import React from 'react';

const PokemonIdStateContext = React.createContext();

const PokemonIdDispatchContext = React.createContext();

function PokemonIdProvider({children}) {
  const [state, setIdPokemon] = React.useState({idPokemon: 1});

  return (
    <PokemonIdStateContext.Provider value={state}>
      <PokemonIdDispatchContext.Provider value={setIdPokemon}>
        {children}
      </PokemonIdDispatchContext.Provider>
    </PokemonIdStateContext.Provider>
  );
}

function usePokemonIdState() {
  const context = React.useContext(PokemonIdStateContext);

  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }

  return context;
}

function useSetPokemonId() {
  const context = React.useContext(PokemonIdDispatchContext);

  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }

  return context;
}

export {usePokemonIdState, useSetPokemonId, PokemonIdProvider};
