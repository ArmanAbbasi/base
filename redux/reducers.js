import { combineReducers } from 'redux';
import {
  FETCH_DATA_IN_PROGRESS,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR
} from './actions';

const defaultDataFetchingState = {
  'fetch_data_error': null,
  'fetch_data_in_progress': false,
  'products': []
};

const dataFetchingReducer = (state = defaultDataFetchingState, action) => {
  switch (action.type) {
  case FETCH_DATA_IN_PROGRESS:
    return Object.assign({}, state, { 'fetch_data_in_progress': true });
  case FETCH_DATA_SUCCESS:
    return Object.assign({}, state, { 'products': action.payload });
  case FETCH_DATA_ERROR:
    return Object.assign({}, state, { 'fetch_data_error': action.payload });
  default:
    return state;
  }
};

const rootReducer = combineReducers({ dataFetchingReducer });

export default rootReducer;