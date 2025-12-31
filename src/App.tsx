// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import AdminLayout from './components/AdminLayout'
// import RecipeListPage from './modules/recipes/recipeList/pages/RecipeListPage'
// import RecipeCategoriesPage from './modules/recipes/recipeCategories/pages/RecipeCategoriesPage'
// import RecipeHotelsPage from './modules/recipes/recipeHotelsList/pages/RecipeHotelsPage'
// import RecipeOrdersPage from './modules/recipes/recipeOrders/pages/RecipeOrdersPage'
// import RecipePaymentsPage from './modules/recipes/recipePayments/pages/RecipePaymentsPage'
// import RecipeSettlementsPage from './modules/recipes/recipeSettlements/pages/RecipeSettlementsPage'
// import CreatorPayoutsPage from './modules/recipes/creatorPayouts/pages/CreatorPayoutsPage'

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Navigate to="/recipes/recipe-list" replace />} />
//         <Route path="/recipes" element={<AdminLayout />}>
//           <Route path="recipe-list" element={<RecipeListPage />} />
//           <Route path="recipe-categories" element={<RecipeCategoriesPage />} />
//           <Route path="recipe-hotels-list" element={<RecipeHotelsPage />} />
//           <Route path="recipe-orders" element={<RecipeOrdersPage />} />
//           <Route path="recipe-payments" element={<RecipePaymentsPage />} />
//           <Route path="recipe-settlements" element={<RecipeSettlementsPage />} />
//           <Route path="creator-payouts" element={<CreatorPayoutsPage />} />
//         </Route>
//       </Routes>
//     </div>
//   )
// }

// export default App

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import RecipeListPage from './modules/recipes/recipeList/pages/RecipeListPage'
import RecipeCategoriesPage from './modules/recipes/recipeCategories/pages/RecipeCategoriesPage'
import RecipeHotelsPage from './modules/recipes/recipeHotelsList/pages/RecipeHotelsPage'
import RecipeOrdersPage from './modules/recipes/recipeOrders/pages/RecipeOrdersPage'
import RecipePaymentsPage from './modules/recipes/recipePayments/pages/RecipePaymentsPage'
import RecipeSettlementsPage from './modules/recipes/recipeSettlements/pages/RecipeSettlementsPage'
import CreatorPayoutsPage from './modules/recipes/creatorPayouts/pages/CreatorPayoutsPage'
import HotelDetailsPage from './modules/recipes/recipeHotelsList/pages/HotelDetailsPage' // Add this import

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/recipes/recipe-list" replace />} />
        <Route path="/recipes" element={<AdminLayout />}>
          <Route path="recipe-list" element={<RecipeListPage />} />
          <Route path="recipe-categories" element={<RecipeCategoriesPage />} />
          <Route path="recipe-hotels-list" element={<RecipeHotelsPage />} />
          <Route path="recipe-orders" element={<RecipeOrdersPage />} />
          <Route path="recipe-payments" element={<RecipePaymentsPage />} />
          <Route path="recipe-settlements" element={<RecipeSettlementsPage />} />
          <Route path="creator-payouts" element={<CreatorPayoutsPage />} />
          {/* Add this new route for hotel details */}
          <Route path="hotels/:hotelId" element={<HotelDetailsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App