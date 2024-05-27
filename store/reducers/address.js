const initialState = {
  selectedAddress:[],
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED_ADDRESS':
      return {
        selectedAddress: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
