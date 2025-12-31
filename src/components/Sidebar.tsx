import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Utensils, List, LayoutGrid, Building, ShoppingCart, CreditCard, FileText, DollarSign } from 'lucide-react'

const menuItems = [
  {
    id: 'recipes',
    label: 'Recipes',
    path: '/recipes',
    icon: Utensils,
    children: [
      { id: 'recipe-list', label: 'Recipe List', path: '/recipes/recipe-list', icon: List },
      { id: 'recipe-categories', label: 'Categories', path: '/recipes/recipe-categories', icon: LayoutGrid },
      { id: 'recipe-hotels-list', label: 'Recipe Hotels List', path: '/recipes/recipe-hotels-list', icon: Building },
      { id: 'recipe-orders', label: 'Recipe Orders', path: '/recipes/recipe-orders', icon: ShoppingCart },
      { id: 'recipe-payments', label: 'Recipe Payments', path: '/recipes/recipe-payments', icon: CreditCard },
      { id: 'recipe-settlements', label: 'Recipe Settlements', path: '/recipes/recipe-settlements', icon: FileText },
      { id: 'creator-payouts', label: 'Creator Payouts', path: '/recipes/creator-payouts', icon: DollarSign },
    ]
  }
]

const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Recipes Admin</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="px-4 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </div>
            </div>
            <ul className="mt-2">
              {item.children.map((child) => (
                <li key={child.id}>
                  <Link
                    to={child.path}
                    className={`flex items-center px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === child.path
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <child.icon className="w-4 h-4 mr-3" />
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar