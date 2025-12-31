import React, { useState } from 'react'
import OrdersTable from '../components/OrdersTable'
import Input from '../../../../components/UI/Input'
import Button from '../../../../components/UI/Button'
import { Search, Filter, X } from 'lucide-react'

const RecipeOrdersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleClearFilters = () => {
    setSearchQuery('')
    setStatusFilter('')
  }

  const hasActiveFilters = searchQuery || statusFilter

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Recipe Orders</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all recipe orders</p>
      </div>
      
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-4">
          {/* Search Input */}
          <div className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search orders by ID, customer, or hotel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base min-w-[140px]"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            
            {/* Action Buttons - Responsive Layout */}
            <div className="flex gap-2 sm:gap-3">
              <Button 
                onClick={() => console.log('Filter applied')}
                className="flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm min-w-[80px] sm:min-w-[100px]"
              >
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={() => console.log('Search applied')}
                className="flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm min-w-[80px] sm:min-w-[100px]"
              >
                <Search className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Search</span>
              </Button>
              
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                  className="flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 border-red-300 hover:bg-red-50 min-w-[80px] sm:min-w-[100px]"
                >
                  <X className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Clear</span>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Active Filter Pills */}
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
      
      <OrdersTable searchQuery={searchQuery} statusFilter={statusFilter} />
    </div>
  )
}

export default RecipeOrdersPage