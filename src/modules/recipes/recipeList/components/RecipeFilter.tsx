import React, { useState } from 'react'
import { Search, X, Filter } from 'lucide-react'
import Input from '../../../../components/UI/Input'
import Button from '../../../../components/UI/Button'

interface RecipeFilterProps {
  onSearch: (query: string) => void
  onFilter: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  onClearFilters: () => void
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({
  onSearch,
  onFilter,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onClearFilters
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSearch(value)
    setSearchQuery(value)
    onSearch(value)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedCategory(value)
    onFilter(value)
  }

  const handleClearAll = () => {
    setLocalSearch('')
    setSearchQuery('')
    setSelectedCategory('')
    onSearch('')
    onFilter('')
    onClearFilters()
  }

  const hasActiveFilters = searchQuery || selectedCategory

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search recipes by name, chef, or category..."
              value={localSearch}
              onChange={handleSearchChange}
              className="pl-10 w-full"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch(localSearch)
                }
              }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All Categories</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Dessert">Dessert</option>
            <option value="Bread">Bread</option>
            <option value="Rice">Rice</option>
            <option value="Main Course">Main Course</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Snack">Snack</option>
            <option value="Breakfast">Breakfast</option>
          </select>

          {/* Clear Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex items-center px-3 py-2 text-red-600 border-red-300 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <Search className="h-3 w-3 mr-1" />
              Search: "{searchQuery}"
              <button 
                onClick={() => {
                  setLocalSearch('')
                  setSearchQuery('')
                  onSearch('')
                }}
                className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              <Filter className="h-3 w-3 mr-1" />
              Category: {selectedCategory}
              <button 
                onClick={() => {
                  setSelectedCategory('')
                  onFilter('')
                }}
                className="ml-2 text-green-600 hover:text-green-800 font-bold"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
      
    </div>
  )
}

export default RecipeFilter