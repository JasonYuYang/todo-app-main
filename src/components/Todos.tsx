import React, { useState, useLayoutEffect, Fragment } from 'react';
import TodoItem from './TodoItem';
import { todoType, useTodoContext } from '../store/TodoContext';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import useMediaQuery from '../hooks/useMediaQuery';

function Todos() {
  let { todos, dispatch } = useTodoContext();
  const [todosRender, setTodosRender] = useState<todoType[]>(todos);
  const [todosAll, setTodosAll] = useState<boolean>(true);
  const [todosComplete, setTodosComplete] = useState<boolean>(false);
  const [todosActive, setTodosActive] = useState<boolean>(false);
  const desktopScreen = useMediaQuery('(min-width: 600px)');

  useLayoutEffect(() => {
    if (todosAll) {
      setTodosRender(todos);
    }
    if (todosComplete) {
      setTodosRender(() => {
        return todos.filter((todo) => todo.complete);
      });
    }
    if (todosActive) {
      setTodosRender(() => {
        return todos.filter((todo) => !todo.complete);
      });
    }
  }, [todos, todosAll, todosComplete, todosActive]);

  const handleOnDragEnd = (result: DropResult): void => {
    if (!result.destination) return;
    const items = [...todos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: 'REORDERED_TODOS', payload: items });
  };
  const handleOnDragStart = () => {
    // good times
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };
  return (
    <React.Fragment>
      <div className='todos'>
        <div className='todo_container'>
          <DragDropContext
            onDragEnd={handleOnDragEnd}
            onDragStart={handleOnDragStart}
          >
            <Droppable droppableId='todos'>
              {(provided) => (
                <ul
                  className='todo_items'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todosRender.map((todo, index) => {
                    return (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TodoItem todo={todo} />
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div className='todo_options'>
            {desktopScreen ? (
              <Fragment>
                <ul className='todo_options--state'>
                  <li className='todo_options--state--items'>
                    <p>{`${todosRender.length} items left`}</p>
                  </li>
                  <li>
                    <ul className='todo_options--options'>
                      <li>
                        <button
                          className={todosAll ? `selected` : ``}
                          onClick={() => {
                            setTodosComplete(false);
                            setTodosActive(false);
                            setTodosAll(true);
                          }}
                        >
                          All
                        </button>
                      </li>
                      <li>
                        <button
                          className={todosActive ? `selected` : ``}
                          onClick={() => {
                            setTodosAll(false);
                            setTodosComplete(false);
                            setTodosActive(true);
                          }}
                        >
                          Active
                        </button>
                      </li>
                      <li>
                        <button
                          className={todosComplete ? `selected` : ``}
                          onClick={() => {
                            setTodosAll(false);
                            setTodosActive(false);
                            setTodosComplete(true);
                          }}
                        >
                          Completed
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li className='todo_options--state--clear'>
                    <button
                      onClick={() => {
                        dispatch({ type: 'CLEAR_COMPLETE' });
                      }}
                    >
                      Clear Completed
                    </button>
                  </li>
                </ul>
              </Fragment>
            ) : (
              <Fragment>
                <ul className='todo_options--state'>
                  <li className='todo_options--state--items'>
                    <p>{`${todosRender.length} items left`}</p>
                  </li>

                  <li className='todo_options--state--clear'>
                    <button
                      onClick={() => {
                        dispatch({ type: 'CLEAR_COMPLETE' });
                      }}
                    >
                      Clear Completed
                    </button>
                  </li>
                </ul>
                <ul className='todo_options--options'>
                  <li>
                    <button
                      className={todosAll ? `selected` : ``}
                      onClick={() => {
                        setTodosComplete(false);
                        setTodosActive(false);
                        setTodosAll(true);
                      }}
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      className={todosActive ? `selected` : ``}
                      onClick={() => {
                        setTodosAll(false);
                        setTodosComplete(false);
                        setTodosActive(true);
                      }}
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      className={todosComplete ? `selected` : ``}
                      onClick={() => {
                        setTodosAll(false);
                        setTodosActive(false);
                        setTodosComplete(true);
                      }}
                    >
                      Completed
                    </button>
                  </li>
                </ul>
              </Fragment>
            )}
          </div>
        </div>{' '}
        <div className='todo_bottom--text'>Drag and drop to reorder list</div>
      </div>
    </React.Fragment>
  );
}

export default Todos;
