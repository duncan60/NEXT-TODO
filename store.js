import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  todos:{
    items: [], 
    isTodoAll: false,
  }
};

export const actionTypes = {
  ADD_TODO_ITEM: 'ADD_TODO_ITEM',
  COMPLETE_TODO_ITEM: 'COMPLETE_TODO_ITEM',
  CLEAR_TODO_ITEM: 'CLEAR_TODO_ITEM',
  CHANGE_ALL_TODO_ITEM: 'CHANGE_ALL_TODO_ITEM',
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { todos } = state;

  switch (type) {
    case actionTypes.ADD_TODO_ITEM:
      const newItem = {
        text: payload.text,
        id: Date.now(),
        status: 'todo',
      };
      return {
        todos: {
          ...todos,
          items: [
            ...todos.items,
            newItem,
          ],
        },
      };
    case actionTypes.CLEAR_TODO_ITEM:
      return {
        todos: {
          ...todos,
          items: todos.items.filter(item => item.id !== payload.id),
        },
      };
    case actionTypes.COMPLETE_TODO_ITEM:
      return {
        todos: {
          ...todos,
          items: todos.items.map(item => 
            item.id === payload.id ?
            {
              ...item,
              status: item.status === 'completed' ? 'todo' : 'completed',
            }:
            item
          ),
        },
      };
    case actionTypes.CHANGE_ALL_TODO_ITEM:
      const isAll = !todos.isTodoAll;
      return  {
        todos: {
          ...todos,
          isTodoAll: isAll,
          items: todos.items.map((item) => {
            return {
              ...item,
              status: isAll ? 'completed' : 'todo',
            };
          }),
        },
      };
    default: return state;
  }
};

export const addTodoItem = (text) => {
  return {
    type: actionTypes.ADD_TODO_ITEM,
    payload: {
      text,
    },
  }
};

export const clearTodoItem = (id) => {
  return {
    type: actionTypes.CLEAR_TODO_ITEM,
    payload: {
      id,
    },
  }
};

export const completeTodoItem = (id) => {
  return {
    type: actionTypes.COMPLETE_TODO_ITEM,
    payload: {
      id,
    },
  }
};

export const changeAllItem = () => {
  return {
    type: actionTypes.CHANGE_ALL_TODO_ITEM,
  }
};

export function initializeStore (initialState = initialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware()))
};
