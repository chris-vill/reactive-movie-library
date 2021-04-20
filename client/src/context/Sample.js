import React, { createContext, useState } from 'react';

export const SampleContext = createContext();

export const SampleProvider = (props) => {
  const [ auth, setState ] = useState(0);

  function plusOne() {
    setState(prev => prev + 1);
  }

  return (
    <SampleContext.Provider value={ [ auth, plusOne ] }>
      { props.children }
    </SampleContext.Provider>
  )
}