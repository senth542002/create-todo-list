import React from 'react'
import API from './api'
export default class TodoList extends React.Component {
  constructor () {
    super()
    this.fetchTodoList = this.fetchTodoList.bind(this)
    this.compareBy.bind(this)
    this.sortBy.bind(this)
   }

  state = {
    data: [],
    title: ''
   }

  fetchTodoList () {
    API.get('/api/todos').then(res => {
      const todoList = res.data
      this.setState({ data: todoList })
      this.sortBy('id')
      console.log(this.state.data)
     })
  }

  compareBy (key) {
    return function (a, b) {
      if (a[ key ] < b[ key ]) return -1
      if (a[ key ] > b[ key ]) return 1
      return 0
    }
  }

  sortBy (key) {
    const arrayCopy = [ ...this.state.data ]
    arrayCopy.sort(this.compareBy(key))
    this.setState({ data: arrayCopy })
  }

  componentDidMount () {
    this.fetchTodoList()
  }

  handleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    API.post('/api/todos', { title: this.state.title })
      .then(res => {
        console.log(res)
        console.log(res.data)
        this.fetchTodoList()
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    return (
        <div>
          <form onSubmit={ this.handleSubmit }>
          <label>
            Todo Title:{ ' ' }
            <input type='text' name='title' onChange={ this.handleChange } />
          </label>
          <button type='submit'>Add</button>
        </form>

        <table
          className='responsive-table'
          style={{ border: '3px solid green', borderRightColor: 'green' }}
        >
          <thead>
            <tr>
              <td onClick={() => this.sortBy('id')}>
                <b>Id</b>
              </td>
              <td>
                <b>Title</b>
              </td>
              <td>
                <b>CreatedAt</b>
              </td>
              <td>
                <b>UpdatedAt</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(todo => {
              return (
                <tr
                  key={todo.id}
                  style={{ border: '3px solid grey', borderRightColor: 'grey' }}
                >
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.createdAt}</td>
                  <td>{todo.updatedAt}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
