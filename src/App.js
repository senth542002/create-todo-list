import React from 'react';
import logo from './logo.svg';
import './App.css';
import PersonList from './PersonList';
import UserList from './UserList';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h2>
        Todo Task List
      </h2>

    </header>
    <div className='rows' script='display:inline;'>
      <TodoList />
    </div>

    </div>
  );
}

export default App;
