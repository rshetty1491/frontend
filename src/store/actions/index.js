export const getFoodDetails =() => ({
  type: 'ADMIN_GET_FOOD_DETAILS',
})

export const postFoodDetails =(data) => ({
  type: 'ADMIN_POST_FOOD_DETAILS',
  payload:data
})

export const deleteFoodDetails =(foodId) => ({
  type: 'ADMIN_DELETE_FOOD_DETAILS',
  payload:foodId
})

export const updateFoodDetails =(foodRecords) => ({
  type: 'ADMIN_UPDATE_FOOD_DETAILS',
  payload:foodRecords
})