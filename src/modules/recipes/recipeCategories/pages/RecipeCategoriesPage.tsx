import React, { useState } from 'react'
import CategoryTable from '../components/CategoryTable'
import Input from '../../../../components/UI/Input'
import Button from '../../../../components/UI/Button'
import { Search, X, Filter } from 'lucide-react'

const RecipeCategoriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleClearFilters = () => {
    setSearchQuery('')
    setStatusFilter('')
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Recipe Categories</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all recipe categories</p>
      </div>
      
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search categories by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base min-w-[140px]"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 border-red-300 hover:bg-red-50 min-w-[80px] sm:min-w-[100px]"
            >
              <X className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Clear All</span>
            </Button>
          </div>
        </div>
        
        {(searchQuery || statusFilter) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-blue-100 text-blue-800">
                <Search className="h-3 w-3 sm:mr-1" />
                <span className="hidden sm:inline">Search: </span>"{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 sm:ml-2 text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-800">
                <Filter className="h-3 w-3 sm:mr-1" />
                <span className="hidden sm:inline">Status: </span>{statusFilter}
                <button 
                  onClick={() => setStatusFilter('')}
                  className="ml-1 sm:ml-2 text-green-600 hover:text-green-800 font-bold"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
      
      <CategoryTable searchQuery={searchQuery} statusFilter={statusFilter} />
    </div>
  )
}

export default RecipeCategoriesPage