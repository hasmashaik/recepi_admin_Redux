import React, { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center p-4 bg-white rounded-lg shadow-lg border-l-4 border-l-green-500 max-w-sm">
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500 mr-3" />
      )}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default Toast