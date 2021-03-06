import services from '../services'

export const SET_DATA_STALE = 'SET_DATA_STALE'
export const setDataStale = card => {
  return { type: SET_DATA_STALE, card }
}

export const REQUEST_DATA = 'REQUEST_DATA'
export const requestData = card => {
  return { type: REQUEST_DATA, card }
}


export const RECEIVE_DATA = 'RECEIVE_DATA'
export const receiveData = (card, data) => {
  data.success = true;
  return {
    type: RECEIVE_DATA,
    card,
    data,
    lastUpdated: Date.now()
  }
}

export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const receiveError = (card, error) => {
  return {
    type: RECEIVE_ERROR,
    card,
    error,
    lastUpdated: Date.now()
  }
}


export const fetchData = card => dispatch => {
  dispatch(requestData(card))
  let errorOccured = false
  let promiseChain;
  if (typeof services[card].getAuth === "function") {
    promiseChain = services[card].getAuth()
    .catch((error) => {
      errorOccured = true
      dispatch(receiveError(card,{type: "Auth", code: error.code, error: error.message}))})
    .then(services[card].getData)
  }
  else {
    promiseChain = services[card].getData()
  }
  return promiseChain
  .catch((error) => {
    if (errorOccured === true) return
    errorOccured = true
    if(error.error !== undefined) error = error.error
    dispatch(receiveError(card,{type: "API", code: error.code, error: error.message}))})
  .then(services[card].transformResponse)
  .catch((error) => {
    if (errorOccured === true) return
    errorOccured = true
    dispatch(receiveError(card,{type: "Transform", code: error.code, error: error.message}))
  })
  .then(data => data && dispatch(receiveData(card, data)))
}


function shouldGetData(state, card) {
  const cardData = state.cards[card]
  if (!cardData) {
    return true
  } else if (cardData.isFetching) {
    return false
  } else {
    return cardData.isStale
  }
}

export function getDataIfNeeded(card) {
  return (dispatch, getState) => {
    if (shouldGetData(getState(), card)) {
      return dispatch(fetchData(card))
    }
  }
}
