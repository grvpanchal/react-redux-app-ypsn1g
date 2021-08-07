import React from 'react'
import { createStore } from 'redux'
import { render, hydrate } from 'react-dom'
import App from '@mfe/app'
import rootReducer from './reducers'

const store = createStore(rootReducer);

const RootComp = () => (<App store={store} />);

const root = document.getElementById('root');

if (root.hasChildNodes() === true) {
  hydrate(<RootComp />, root);
} else {
  render(<RootComp />, root);
}
