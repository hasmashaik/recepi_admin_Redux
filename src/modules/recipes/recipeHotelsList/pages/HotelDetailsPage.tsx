import React, { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import { ArrowLeft, MapPin, Phone, Mail, Star, Calendar, ChefHat, Filter, X } from 'lucide-react'
import Badge from '../../../../components/UI/Badge'
import Button from '../../../../components/UI/Button'
import Table from '../../../../components/UI/Table'

const HotelDetailsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>()
  const hotels = useSelector((state: RootState) => state.hotels)
  const recipes = useSelector((state: RootState) => state.recipes)
  
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Find the specific hotel
  const hotel = useMemo(() => {
    return hotels.find(h => h.id === hotelId)
  }, [hotels, hotelId])

  // Filter recipes by hotelId and other filters
  const hotelRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // First filter by hotelId
      if (recipe.hotelId !== hotelId) return false
      
      // Then apply other filters
      const matchesCategory = categoryFilter === '' || recipe.category === categoryFilter
      const matchesStatus = statusFilter === '' || recipe.status === statusFilter
      const matchesSearch = searchQuery === '' || 
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.chef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesCategory && matchesStatus && matchesSearch
    })
  }, [recipes, hotelId, categoryFilter, statusFilter, searchQuery])

  // Get unique categories for filter dropdown
  const uniqueCategories = useMemo(() => {
    const categories = recipes
      .filter(recipe => recipe.hotelId === hotelId)
      .map(recipe => recipe.category)
    return Array.from(new Set(categories))
  }, [recipes, hotelId])

  const handleClearFilters = () => {
    setCategoryFilter('')
    setStatusFilter('')
    setSearchQuery('')
  }

  const hasActiveFilters = categoryFilter || statusFilter || searchQuery

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
          <p className="text-gray-600 mb-6">The hotel you're looking for doesn't exist.</p>
          <Link to="/recipes/recipe-hotels-list">
            <Button variant="primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hotels List
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/recipes/recipe-hotels-list">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hotels
          </Button>
        </Link>
      </div>

      {/* Hotel Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.address}, {hotel.city}, {hotel.state}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>{hotel.contact}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>{hotel.email}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{hotel.rating}</div>
              <div className="flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">Rating</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{hotelRecipes.length}</div>
              <div className="text-sm text-gray-600">Recipes</div>
            </div>
            <Badge variant={hotel.status === 'Active' ? 'success' : 'danger'}>
              {hotel.status}
            </Badge>
          </div>
        </div>

        {/* Hotel Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-700 mb-1">Joined Date</div>
            <div className="flex items-center text-blue-900">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(hotel.joinedAt).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-700 mb-1">Status</div>
            <div className="text-green-900 font-medium">{hotel.status}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-purple-700 mb-1">Total Recipes</div>
            <div className="text-purple-900 font-medium">{hotelRecipes.length} Recipes</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="text-sm text-amber-700 mb-1">Average Rating</div>
            <div className="flex items-center text-amber-900 font-medium">
              <Star className="h-4 w-4 mr-1 text-amber-500" />
              {hotelRecipes.length > 0 
                ? (hotelRecipes.reduce((sum, recipe) => sum + recipe.rating, 0) / hotelRecipes.length).toFixed(1)
                : '0.0'}
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Section with Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Hotel Recipes</h2>
              <p className="text-gray-600 text-sm mt-1">All recipes provided by {hotel.name}</p>
            </div>
            <div className="mt-2 md:mt-0 text-sm text-gray-500">
              Showing {hotelRecipes.length} of {recipes.filter(r => r.hotelId === hotelId).length} recipes
            </div>
          </div>

          {/* Filter Controls */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex items-center justify-center px-3 py-2 text-sm text-red-600 border-red-300 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="mt-3 flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Search: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              )}
              {categoryFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Category: {categoryFilter}
                  <button 
                    onClick={() => setCategoryFilter('')}
                    className="ml-2 text-green-600 hover:text-green-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  Status: {statusFilter}
                  <button 
                    onClick={() => setStatusFilter('')}
                    className="ml-2 text-purple-600 hover:text-purple-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {hotelRecipes.length === 0 ? (
          <div className="text-center py-12">
            {hasActiveFilters ? (
              <>
                <div className="text-gray-500 text-lg mb-2">No recipes found with current filters</div>
                <div className="text-gray-400 text-sm mb-4">
                  Try adjusting your search or filter criteria
                </div>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="flex items-center mx-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </>
            ) : (
              <>
                <div className="text-gray-500 text-lg mb-2">No recipes found for this hotel</div>
                <div className="text-gray-400 text-sm">
                  This hotel hasn't added any recipes yet
                </div>
              </>
            )}
          </div>
        ) : (
          <Table
            headers={['ID', 'Recipe', 'Category', 'Price', 'Status', 'Rating', 'Chef', 'Actions']}
          >
            {hotelRecipes.map((recipe) => (
              <tr key={recipe.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {recipe.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded object-cover" src={recipe.image} alt={recipe.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{recipe.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{recipe.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Badge variant={recipe.category === 'Veg' ? 'success' : recipe.category === 'Non-Veg' ? 'warning' : 'info'}>
                    {recipe.category}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ₹{recipe.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={recipe.status === 'Active' ? 'success' : 'danger'}>
                    {recipe.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {recipe.rating}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <ChefHat className="h-4 w-4 text-gray-400 mr-2" />
                    {recipe.chef}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log('View recipe:', recipe.id)}
                      className="px-3 py-1 text-xs"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log('Edit recipe:', recipe.id)}
                      className="px-3 py-1 text-xs"
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* Recipe Stats */}
      {hotelRecipes.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Category Distribution</h3>
            <div className="space-y-2">
              {Array.from(new Set(hotelRecipes.map(r => r.category))).map(category => {
                const count = hotelRecipes.filter(r => r.category === category).length
                const percentage = (count / hotelRecipes.length) * 100
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{category}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${category === 'Veg' ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Lowest</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{Math.min(...hotelRecipes.map(r => r.price))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Highest</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{Math.max(...hotelRecipes.map(r => r.price))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{Math.round(hotelRecipes.reduce((sum, r) => sum + r.price, 0) / hotelRecipes.length)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Status Overview</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Recipes</span>
                <span className="text-sm font-medium text-green-600">
                  {hotelRecipes.filter(r => r.status === 'Active').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Inactive Recipes</span>
                <span className="text-sm font-medium text-red-600">
                  {hotelRecipes.filter(r => r.status === 'Inactive').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Rate</span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round((hotelRecipes.filter(r => r.status === 'Active').length / hotelRecipes.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelDetailsPage