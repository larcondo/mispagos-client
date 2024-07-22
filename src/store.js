import { configureStore } from '@reduxjs/toolkit';

import pagosReducer from '@reducers/pagosReducer';
import filterReducer from '@reducers/filtrosReducer';
import summaryReducer from '@reducers/summaryReducer';

const store = configureStore({
  reducer: {
    pagos: pagosReducer,
    filter: filterReducer,
    summary: summaryReducer,
  }
});

export default store;