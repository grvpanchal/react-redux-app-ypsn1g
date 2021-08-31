import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
// import VisibleTodoList from '../containers/VisibleTodoList'
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
// import loadable from './Loadable';
import loadable from '@loadable/component'
import Hello from '@mfe/hello';

const VisibleTodoList = loadable(() => import('../containers/VisibleTodoList'));

const App = () => (
  <div className="container" style={{ maxWidth: '330px' }}>
    <br />
    <br />
    <h1 className="text-center">Todo App</h1>
    <Hello />
    <br />
    <AddTodo />
    <br />
    <VisibleTodoList />
    <Footer />
  </div>
);

export const renderString = ({ store }) => {
  return renderToString(<RootApp store={store} />)
}

const RootApp = ({ store }) => {  
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
