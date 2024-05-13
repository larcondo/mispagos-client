const initialState = { tipo: 'Todos', detalle: 'Todos', year: 'Todos', month: 'Todos', obs: '' };

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return action.payload;
  case 'CLEAN_FILTER':
    return initialState;
  default:
    return state;
  }
};

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter
  };
};

export default filterReducer;