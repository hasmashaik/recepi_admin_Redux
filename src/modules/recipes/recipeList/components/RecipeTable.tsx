// modules/recipes/recipeList/components/RecipeTable.tsx
import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../app/store'
import { deleteRecipe, toggleRecipeStatus } from '../recipeSlice'
import Badge from '../../../../components/UI/Badge'
import Button from '../../../../components/UI/Button'
import Table from '../../../../components/UI/Table'
import { Eye, Edit, Trash2, MoreVertical, Star } from 'lucide-react'

interface RecipeTableProps {
  searchQuery: string
  selectedCategory: string
}

const RecipeTable: React.FC<RecipeTableProps> = ({ searchQuery, selectedCategory }) => {
  const recipes = useSelector((state: RootState) => state.recipes)
  const dispatch = useDispatch()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = searchQuery === '' || 
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.chef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === '' || recipe.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, selectedCategory])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleView = (recipe: any) => {
    console.log('View recipe:', recipe)
    showNotification(`Viewing recipe: ${recipe.name}`, 'success')
    setActiveDropdown(null)
  }

  const handleEdit = (recipe: any) => {
    console.log('Edit recipe:', recipe)
    showNotification(`Editing recipe: ${recipe.name}`, 'success')
    setActiveDropdown(null)
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      dispatch(deleteRecipe(id))
      showNotification(`Recipe "${name}" deleted successfully`, 'success')
      setActiveDropdown(null)
    }
  }

  const handleToggleStatus = (id: string, name: string, currentStatus: string) => {
    dispatch(toggleRecipeStatus(id))
    showNotification(
      `Recipe "${name}" ${currentStatus === 'Active' ? 'deactivated' : 'activated'}`,
      'success'
    )
    setActiveDropdown(null)
  }

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 bg-white rounded-lg shadow-lg border-l-4 max-w-sm ${
          notification.type === 'success' ? 'border-l-green-500' : 'border-l-red-500'
        }`}>
          {notification.type === 'success' ? (
            <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Table Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recipes</h3>
        <div className="text-sm text-gray-500">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No recipes found</div>
          <div className="text-gray-400 text-sm">
            Try adjusting your search or filter criteria
          </div>
        </div>
      ) : (
        <Table
          headers={['ID', 'Name', 'Category', 'Price', 'Status', 'Rating', 'Actions']}
        >
          {filteredRecipes.map((recipe) => (
            <tr key={recipe.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {recipe.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img 
                      className="h-10 w-10 rounded-full object-cover" 
                      src={recipe.image} 
                      alt={recipe.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Recipe'
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{recipe.name}</div>
                    <div className="text-sm text-gray-500">by {recipe.chef}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Badge variant={recipe.category === 'Veg' ? 'success' : 'warning'}>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {/* Desktop: Show all buttons */}
                <div className="hidden sm:flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(recipe)}
                    className="p-1.5 min-w-[32px] text-blue-600 border-blue-300 hover:bg-blue-50"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(recipe)}
                    className="p-1.5 min-w-[32px] text-green-600 border-green-300 hover:bg-green-50"
                    title="Edit Recipe"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(recipe.id, recipe.name, recipe.status)}
                    className="p-1.5 min-w-[32px] text-amber-600 border-amber-300 hover:bg-amber-50"
                    title={recipe.status === 'Active' ? 'Deactivate' : 'Activate'}
                  >
                    {recipe.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(recipe.id, recipe.name)}
                    className="p-1.5 min-w-[32px] text-red-600 border-red-300 hover:bg-red-50"
                    title="Delete Recipe"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Mobile: Dropdown menu */}
                <div className="sm:hidden relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDropdown(recipe.id)}
                    className="p-1.5 min-w-[32px]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  
                  {activeDropdown === recipe.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => handleView(recipe)}
                        className="flex items-center w-full px-3 py-2 text-xs text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        View Details
                      </button>
                      <button
                        onClick={() => handleEdit(recipe)}
                        className="flex items-center w-full px-3 py-2 text-xs text-green-600 hover:bg-green-50"
                      >
                        <Edit className="h-3 w-3 mr-2" />
                        Edit Recipe
                      </button>
                      <button
                        onClick={() => handleToggleStatus(recipe.id, recipe.name, recipe.status)}
                        className="flex items-center w-full px-3 py-2 text-xs text-amber-600 hover:bg-amber-50"
                      >
                        {recipe.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(recipe.id, recipe.name)}
                        className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Delete Recipe
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  )
}

export default RecipeTable