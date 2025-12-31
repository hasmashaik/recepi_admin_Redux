import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom' // Add this import
import { RootState } from '../../../../app/store'
import Badge from '../../../../components/UI/Badge'
import Button from '../../../../components/UI/Button'
import Table from '../../../../components/UI/Table'
import { Eye, Edit, Trash2, Star, MoreVertical } from 'lucide-react'

interface HotelsTableProps {
  searchQuery: string
  statusFilter: string
  ratingFilter: string
  stateFilter: string
}

const HotelsTable: React.FC<HotelsTableProps> = ({ searchQuery, statusFilter, ratingFilter, stateFilter }) => {
  const hotels = useSelector((state: RootState) => state.hotels)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [notification, setNotification] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesSearch = searchQuery === '' || 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.contact.includes(searchQuery)
      
      const matchesStatus = statusFilter === '' || hotel.status === statusFilter
      const matchesRating = ratingFilter === '' || hotel.rating >= parseFloat(ratingFilter)
      const matchesState = stateFilter === '' || hotel.state === stateFilter
      
      return matchesSearch && matchesStatus && matchesRating && matchesState
    })
  }, [hotels, searchQuery, statusFilter, ratingFilter, stateFilter])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleView = (id: string) => {
    console.log('View hotel:', id)
    showNotification(`Viewing hotel: ${id}`, 'success')
    setActiveDropdown(null)
  }

  const handleEdit = (id: string) => {
    console.log('Edit hotel:', id)
    showNotification(`Editing hotel: ${id}`, 'success')
    setActiveDropdown(null)
  }

  const handleDelete = (id: string) => {
    console.log('Delete hotel:', id)
    showNotification(`Deleting hotel: ${id}`, 'success')
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
        <h3 className="text-lg font-medium text-gray-900">Hotels</h3>
        <div className="text-sm text-gray-500">
          Showing {filteredHotels.length} of {hotels.length} hotels
        </div>
      </div>

      {filteredHotels.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No hotels found</div>
          <div className="text-gray-400 text-sm">
            Try adjusting your search or filter criteria
          </div>
        </div>
      ) : (
        <Table
          headers={['ID', 'Name', 'Location', 'Contact', 'Rating', 'Recipes', 'Status', 'Actions']}
        >
          {filteredHotels.map((hotel) => (
            <tr key={`${hotel.id}-hotel`} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                {hotel.id}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {/* Updated: Make hotel name clickable */}
                <Link 
                  to={`/recipes/hotels/${hotel.id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {hotel.name}
                </Link>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {hotel.city}, {hotel.state}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {hotel.contact}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                <div className="flex items-center">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mr-1" />
                  {hotel.rating}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {hotel.recipeCount}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <Badge variant={hotel.status === 'Active' ? 'success' : 'danger'}>
                  {hotel.status}
                </Badge>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                {/* Desktop: Show all buttons */}
                <div className="hidden sm:flex space-x-2">
                  <Link to={`/recipes/hotels/${hotel.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-1.5 min-w-[32px]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(hotel.id)}
                    className="p-1.5 min-w-[32px]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(hotel.id)}
                    className="p-1.5 min-w-[32px] text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Mobile: Dropdown menu */}
                <div className="sm:hidden relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDropdown(hotel.id)}
                    className="p-1.5 min-w-[32px]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  
                  {activeDropdown === hotel.id && (
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <Link
                        to={`/recipes/hotels/${hotel.id}`}
                        className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        View Details
                      </Link>
                      <button
                        onClick={() => handleEdit(hotel.id)}
                        className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="h-3 w-3 mr-2" />
                        Edit Hotel
                      </button>
                      <button
                        onClick={() => handleDelete(hotel.id)}
                        className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Delete Hotel
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

export default HotelsTable