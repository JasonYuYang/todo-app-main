import React, { useReducer, useContext } from 'react';

import { useLocalStorage } from '../hooks/useStorage';

import TodoReducer from './TodoReducer';
import { TodoAction } from './TodoReducer';

export type todoType = {
  id: string;
  task: string;
  complete: boolean;
};

export interface TodoStateType {
  todos: todoType[];
}

interface stateContextType extends TodoStateType {
  dispatch: React.Dispatch<TodoAction>;
}

export const InitialState: TodoStateType = {
  todos: [],
};

export const TodoContext = React.createContext<stateContextType>(
  InitialState as stateContextType
);

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value] = useLocalStorage('todos', []);

  const [currentState, dispatch] = useReducer(TodoReducer, {
    ...InitialState,
    
    todos: value,
  });
  return (
    <TodoContext.Provider value={{ ...currentState, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  let ctx = useContext(TodoContext);
  if (ctx === undefined) {
    throw new Error('useTodoContext must used in TodoContextProvider');
  }

  return ctx;
};
