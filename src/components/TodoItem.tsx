import React, { useRef, useState, useEffect, useCallback } from 'react';

import { todoType, useTodoContext } from '../store/TodoContext';
import useClickOutside from '../hooks/useClickOutside';
import useMediaQuery from '../hooks/useMediaQuery';

const TodoItem = ({ todo }: { todo: todoType }) => {
  const [checked, setChecked] = useState<boolean>(todo.complete);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.task);

  const { dispatch } = useTodoContext();
  const initialRender = useRef<boolean>(true);
  const clickCount = useRef<number>(0);
  const todoInputRef = useRef<HTMLTextAreaElement>(null);
  const desktopScreen = useMediaQuery('(min-width: 600px)');

  useClickOutside(todoInputRef, () => {
    if (isEditing) {
      dispatch({ type: 'EDIT_TODO', payload: { ...todo, task: editTodo } });
      setIsReadOnly(true);
      setIsEditing(false);
    }
  });

  const toggleComplete = useCallback(
    (checked: boolean): void => {
      dispatch({
        type: 'COMPLETE_TODO',
        payload: { ...todo, complete: checked },
      });
    },
    [dispatch, todo]
  );

  const handleUserKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isEditing) {
        dispatch({
          type: 'EDIT_TODO',
          payload: { ...todo, task: editTodo },
        });
        setIsEditing(false);
        setIsReadOnly(true);
      }
    }
  };
  const enableEditDoubleClick = () => {
    if (checked) return;
    let timeout!: ReturnType<typeof setTimeout>;
    clickCount.current++;
    if (clickCount.current === 1) {
      timeout = setTimeout(() => {
        clickCount.current = 0;
      }, 200);
    } else if (clickCount.current === 2) {
      clearTimeout(timeout);
      clickCount.current = 0;
      setIsReadOnly(false);
      setIsEditing(true);
    }
  };
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    toggleComplete(checked);
  }, [checked, toggleComplete]);

  return (
    <React.Fragment>
      <div className='todo_item'>
        <form className='todo_form'>
          <div className='todo_check_button'>
            <input
              id={`check_input--${todo.id}`}
              type='checkbox'
              className='todo_check_button--input'
              checked={checked}
              onChange={event => {
                setChecked(event.currentTarget.checked);
              }}
            />
            <label
              htmlFor={`check_input--${todo.id}`}
              className='todo_check_button--input-button'
            />{' '}
            <textarea
              readOnly={isReadOnly}
              ref={todoInputRef}
              value={editTodo}
              id='description'
              className='todo_check_button--description'
              onChange={e => {
                setEditTodo(e.target.value);
              }}
              onKeyPress={handleUserKeyPress}
              onClick={desktopScreen ? enableEditDoubleClick : undefined}
            />
          </div>
        </form>
        <button
          className='todo_remove'
          onClick={() => {
            dispatch({ type: 'REMOVE_TODO', payload: todo });
          }}
        ></button>
      </div>
    </React.Fragment>
  );
};

export default TodoItem;
