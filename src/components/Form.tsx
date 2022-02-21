import React from 'react';
import { useState } from 'react';

import { useTodoContext } from '../store/TodoContext';

import Todo from '../store/Todo';

const Form = () => {
  let [inputTodo, setInputTodo] = useState('');
  const { dispatch } = useTodoContext();

  let todoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTodo) return;
    dispatch({ type: 'ADD_TODO', payload: new Todo(inputTodo) });
    setInputTodo('');
  };

  return (
    <form className='todos_form_container' onSubmit={todoSubmit}>
      <div className='todos_check_wrapper'></div>
      <input
        type='text'
        autoComplete='off'
        id='todos_input'
        value={inputTodo}
        onChange={(e) => {
          setInputTodo(e.target.value);
        }}
        placeholder='Create a new todo...'
      />
    </form>
  );
};

export default Form;
