import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useKeydown } from '../../hooks/useKeydown'

const ToastContext = createContext({})

export function useToasts() {
  return useContext(ToastContext)
}

function useToastContext() {
  const [toasts, setToasts] = useState([])

  const createToast = useCallback((toast) => {
    setToasts((prevToasts) => [...prevToasts, { id: window.crypto.randomUUID(), text: toast.text, variant: toast.variant }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id))
  }, [])

  const removeAll = useCallback(() => setToasts([]), [])

  useKeydown('Escape', removeAll)

  return useMemo(() => ({
    toasts,
    createToast,
    removeToast
  }), [createToast, removeToast, toasts])
}

function ToastProvider({children}) {
  const context = useToastContext()

  return <ToastContext.Provider value={context}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
