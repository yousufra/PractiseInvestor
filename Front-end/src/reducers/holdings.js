const reducer = (holdings=[], action) => { //need to inialize state(holdings) , holdings is gunna be an array of objects
  switch (action.type) {
    case 'FETCH_HOLDINGS':
      return action.payload;
    case 'UPDATE_HOLDING':
      return action.payload;
    default:
      return holdings;
  }
}

export default reducer;