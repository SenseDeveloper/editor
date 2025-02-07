import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const EditorContext = createContext();

const initialState = {
  elements: [],
  selectedElementId: null,
  history: {
    past: [],
    future: [],
  },
};

const historyMiddleware = (reducer) => (state, action) => {
  switch (action.type) {
    case 'UNDO': {
      if (state.history.past.length === 0) return state;
      return {
        ...state.history.past[0],
        history: {
          past: state.history.past.slice(1),
          future: [state, ...state.history.future],
        },
      };
    }
    case 'REDO': {
      if (state.history.future.length === 0) return state;
      return {
        ...state.history.future[0],
        history: {
          past: [state, ...state.history.past],
          future: state.history.future.slice(1),
        },
      };
    }
    default: {
      const newState = reducer(state, action);
      return {
        ...newState,
        history: {
          past: [state, ...newState.history.past.slice(0, 49)],
          future: [],
        },
      };
    }
  }
};

const baseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      return {
        ...state,
        elements: [
          ...state.elements,
          {
            id: uuidv4(),
            type: action.payload.type,
            props: getDefaultProps(action.payload.type),
            position: action.payload.position,
          },
        ],
        selectedElementId: null,
      };
    }
    case 'SELECT_ELEMENT': {
      return {
        ...state,
        selectedElementId: action.payload,
      };
    }
    case 'UPDATE_ELEMENT': {
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id
            ? {
                ...el,
                ...action.payload.updates,
                position: action.payload.position || el.position,
              }
            : el
        ),
      };
    }
    case 'MOVE_ELEMENT': {
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id
            ? {
                ...el,
                position: action.payload.position,
              }
            : el
        ),
      };
    }
    default:
      return state;
  }
};

const reducer = historyMiddleware(baseReducer);

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addElement = useCallback((type, position) => {
    dispatch({
      type: 'ADD_ELEMENT',
      payload: { type, position },
    });
  }, []);

  const updateElement = useCallback((id, updates) => {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: { id, updates },
    });
  }, []);

  const moveElement = useCallback((id, position) => {
    dispatch({
      type: 'MOVE_ELEMENT',
      payload: { id, position },
    });
  }, []);

  const value = {
    state,
    actions: {
      addElement,
      updateElement,
      moveElement,
      undo: () => dispatch({ type: 'UNDO' }),
      redo: () => dispatch({ type: 'REDO' }),
      selectElement: (id) => dispatch({ type: 'SELECT_ELEMENT', payload: id }),
    },
  };

  return (
    <EditorContext.Provider value={value}> {children} </EditorContext.Provider>
  );
};

EditorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

const getDefaultProps = (type) => {
  const defaults = {
    text: {
      content: 'Новый текст',
      fontSize: 16,
      color: '#000000',
    },
    button: {
      label: 'Кнопка',
      bgColor: '#1976d2',
      color: '#ffffff',
      width: 120,
    },
    image: {
      src: 'https://via.placeholder.com/150',
      width: 150,
    },
  };
  return defaults[type] || {};
};
