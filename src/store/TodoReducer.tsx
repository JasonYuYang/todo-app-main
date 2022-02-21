import { TodoStateType } from './TodoContext';
import { todoType } from './TodoContext';

export const setLocalStorage = (key: string, value: any) => {
  if (value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }
};
export function getLocalStorage<T>(key: string): T | null {
  let value = localStorage.getItem(key);
  if (value && value !== undefined && value !== null) {
    return JSON.parse(value);
  }
  return null;
}

export type TodoAction =
  | {
      type: 'ADD_TODO' | 'EDIT_TODO' | 'REMOVE_TODO' | 'COMPLETE_TODO';
      payload: todoType;
    }
  | {
      type: 'TOGGLE_THEME';
      payload: string;
    }
  | {
      type: 'REORDERED_TODOS';
      payload: todoType[];
    }
  | {
      type: 'CLEAR_COMPLETE';
    };

const TodoReducer = (
  state: TodoStateType,
  action: TodoAction
): TodoStateType => {
  if (action.type === 'ADD_TODO') {
    setLocalStorage('todos', [...state.todos, action.payload]);
    return { ...state, todos: [...state.todos, action.payload] };
  }

  if (action.type === 'EDIT_TODO') {
    let afterEditedTodos = state.todos.map((todo) => {
      if (todo.id === action.payload.id) {
        todo.task = action.payload.task;
      }
      return todo;
    });
    setLocalStorage('todos', afterEditedTodos);
    return { ...state, todos: afterEditedTodos };
  }

  if (action.type === 'REMOVE_TODO') {
    let filterTodos = state.todos.filter((todo) => {
      return !(todo.id === action.payload.id);
    });
    setLocalStorage('todos', filterTodos);
    return { ...state, todos: filterTodos };
  }

  if (action.type === 'COMPLETE_TODO') {
    const completeTodos = state.todos.map((todo) => {
      if (todo.id === action.payload.id) {
        todo.complete = action.payload.complete;
      }
      return todo;
    });
    setLocalStorage('todos', completeTodos);
    return { ...state, todos: completeTodos };
  }

  if (action.type === 'REORDERED_TODOS') {
    setLocalStorage('todos', action.payload);
    return { ...state, todos: action.payload };
  }
  if (action.type === 'CLEAR_COMPLETE') {
    const clearCompleteTodos = state.todos.filter((todo) => {
      return !todo.complete;
    });
    setLocalStorage('todos', clearCompleteTodos);
    return { ...state, todos: clearCompleteTodos };
  }

  return state;
};

export default TodoReducer;
