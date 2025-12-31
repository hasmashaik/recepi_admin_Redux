import React, { useState, useCallback } from 'react'
import RecipeTable from '../components/RecipeTable'
import RecipeFilter from '../components/RecipeFilter'

const RecipeListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleFilter = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('')
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Simplified Header - No Stats Boxes */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Recipe List</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all your recipes in one place</p>
      </div>
      
      {/* Filter Component */}
      <RecipeFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onClearFilters={handleClearFilters}
      />
      
      {/* Table Component */}
      <RecipeTable 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  )
}

export default RecipeListPage