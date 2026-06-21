'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Toast = {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

type ToastContextType = {
  addToast: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function Toaster({ children }: { children?: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-emerald-700 text-emerald-50'
                : toast.type === 'error'
                  ? 'bg-red-800 text-red-50'
                  : 'bg-zinc-800 text-zinc-100'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
