import { combineReducers } from '@reduxjs/toolkit'
import recipeReducer from '../modules/recipes/recipeList/recipeSlice'
import categoryReducer from '../modules/recipes/recipeCategories/categorySlice'
import hotelsReducer from '../modules/recipes/recipeHotelsList/hotelsSlice'
import ordersReducer from '../modules/recipes/recipeOrders/ordersSlice'
import paymentsReducer from '../modules/recipes/recipePayments/paymentsSlice'
import settlementsReducer from '../modules/recipes/recipeSettlements/settlementsSlice'
import payoutsReducer from '../modules/recipes/creatorPayouts/payoutsSlice'

const rootReducer = combineReducers({
  recipes: recipeReducer,
  categories: categoryReducer,
  hotels: hotelsReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  settlements: settlementsReducer,
  payouts: payoutsReducer,
})

export default rootReducer