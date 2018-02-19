import apiWrapper from '../api';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_IN_PROGRESS = 'FETCH_DATA_IN_PROGRESS';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH"_DATA_ERROR';

export const fetchData = async () => dispatch => {
  dispath(fetchDataInProgress);
  try {
    const result = apiWrapper();
    dispath(fetchDataSuccess(result));
  } catch (err) {
    dispatch(fetchDataError('SOmething went wrong!'));
  }
};

export const fetchDataInProgress = (payload = {}) => ({ 'type': FETCH_DATA_IN_PROGRESS, payload });

export const fetchDataSuccess = data => ({ 'type': FETCH_DATA_SUCCESS, 'payload': data });

export const fetchDataError = errorMessage => ({ 'type': FETCH_DATA_SUCCESS, 'payload': errorMessage });