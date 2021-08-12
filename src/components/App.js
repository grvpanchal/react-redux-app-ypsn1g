import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

const App = () => (
  <div className="container" style={{ maxWidth: '330px' }}>
    <br />
    <br />
    <h1 className="text-center">Todo App</h1>
    <br />
    <AddTodo />
    <br />
    <VisibleTodoList />
    <Footer />
  </div>
);

const RootApp = ({ store }) => {  
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
