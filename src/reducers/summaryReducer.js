import pagosService from '@services/pagos';
const initialState = {};

const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_SUMMARY':
    return action.payload;
  case 'CLEAN_SUMMARY':
    return initialState;
  default:
    return state;
  }
};

export const summaryChange = () => {
  return async dispatch => {
    const response = await pagosService.getSummary();
    dispatch({ type: 'SET_SUMMARY', payload: response.data });
  };
};

export default summaryReducer;

/*
  summary: {
    lastEight: [],
    lastMonth: null,
    message: null,
    pagosLastMonth: [],
    values: {
      average: null,
      max: null,
      min: null,
      monthName: null,
      quantity: null,
      total: null
    }
  }

*/