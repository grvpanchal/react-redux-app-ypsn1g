import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        
        <div className="input-group">
          <input className="form-control" ref={node => input = node} />
          <span className="input-group-btn">
            <button className="btn btn-success" type="submit">
              Add Todo
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}

export default connect()(AddTodo)