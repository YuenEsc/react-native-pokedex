import React from 'react';

const PokemonColorStateContext = React.createContext();

const PokemonColorDispatchContext = React.createContext();

function PokemonColorProvider({children}) {
  const [state, setPokemonColor] = React.useState({pokemonColor: '#ffffff'});

  return (
    <PokemonColorStateContext.Provider value={state}>
      <PokemonColorDispatchContext.Provider value={setPokemonColor}>
        {children}
      </PokemonColorDispatchContext.Provider>
    </PokemonColorStateContext.Provider>
  );
}

function usePokemonColorState() {
  const context = React.useContext(PokemonColorStateContext);

  if (context === undefined) {
    throw new Error(
      'usePokemonColorState must be used within a PokemonColorProvider',
    );
  }

  return context;
}

function useSetPokemonColor() {
  const context = React.useContext(PokemonColorDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useSetPokemonColor must be used within a PokemonColorProvider',
    );
  }

  return context;
}

export {usePokemonColorState, useSetPokemonColor, PokemonColorProvider};
