const reducer = (state = {}, action) => {
  switch (action.type) {
      case 'ADMIN_GET_FOOD_DETAILS':
          return { ...state }
      case 'ADMIN_GET_FOOD_DETAILS_RECEIVED':
          return { ...state, foodDetails: action.foodDetails }
      case 'ADMIN_POST_FOOD_DETAILS':
          return { ...state }
      case 'ADMIN_POST_FOOD_DETAILS_RESPONSE_RECEIVED':
          return { ...state, response: action.response }
      case 'ADMIN_DELETE_FOOD_DETAILS':
          return { ...state }
      case 'ADMIN_DELETE_FOOD_DETAILS_RESPONSE_RECEIVED':
          return { ...state, response: action.response }
      case 'ADMIN_UPDATE_FOOD_DETAILS':
          return { ...state }
      case 'ADMIN_UPDATE_FOOD_DETAILS_RESPONSE_RECEIVED':
          return { ...state, response: action.response }
      default:
          return state;
  }
}

export default reducer