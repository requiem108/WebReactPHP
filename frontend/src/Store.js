import React from 'react';
import { createContext, useReducer } from 'react';


export const Store = createContext();

const initialState = {
  url: 'http://localhost/TOM-A/backend/models/',
  token:'',
  usuario: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}