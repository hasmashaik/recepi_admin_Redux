import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import Badge from '../../../../components/UI/Badge'
import Button from '../../../../components/UI/Button'
import Table from '../../../../components/UI/Table'
import { Eye, Edit, MoreVertical } from 'lucide-react'

interface CategoryTableProps {
  searchQuery: string
}

const CategoryTable: React.FC<CategoryTableProps> = ({ searchQuery }) => {
  const categories = useSelector((state: RootState) => state.categories)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [notification, setNotification] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch = searchQuery === '' || 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesSearch
    })
  }, [categories, searchQuery])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleView = (id: string) => {
    console.log('View category:', id)
    showNotification(`Viewing category: ${id}`, 'success')
    setActiveDropdown(null)
  }

  const handleEdit = (id: string) => {
    console.log('Edit category:', id)
    showNotification(`Editing category: ${id}`, 'success')
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

      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        <div className="text-sm text-gray-500">
          Showing {filteredCategories.length} of {categories.length} categories
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No categories found</div>
          <div className="text-gray-400 text-sm">
            Try adjusting your search criteria
          </div>
        </div>
      ) : (
        <Table
          headers={['ID', 'Name', 'Description', 'Recipe Count', 'Status', 'Actions']}
        >
          {filteredCategories.map((category) => (
            <tr key={`${category.id}-cat`} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                {category.id}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {category.name}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 max-w-xs truncate">
                {category.description}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {category.recipeCount}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <Badge variant={category.status === 'Active' ? 'success' : 'danger'}>
                  {category.status}
                </Badge>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                {/* Desktop: Show view and edit buttons only */}
                <div className="hidden sm:flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(category.id)}
                    className="p-1.5 min-w-[32px]"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(category.id)}
                    className="p-1.5 min-w-[32px]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Mobile: Dropdown menu */}
                <div className="sm:hidden relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDropdown(category.id)}
                    className="p-1.5 min-w-[32px]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  
                  {activeDropdown === category.id && (
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => handleView(category.id)}
                        className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="h-3 w-3 mr-2" />
                        Edit
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

export default CategoryTable