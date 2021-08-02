import React from 'react'
import { createStore } from 'redux'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import rootReducer from '../reducers'

export const store = createStore(rootReducer)

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
)

export default App