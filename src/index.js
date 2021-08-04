import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import App, { store } from '@mfe/app'

const RootComp = () => (<Provider store={store}><App /></Provider>);

const root = document.getElementById('root');

if (root.hasChildNodes() === true) {
  hydrate(<RootComp />, root);
} else {
  render(<RootComp />, root);
}

export default App;
