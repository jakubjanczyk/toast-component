import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext({})

export function useToastContext() {
  return useContext(ToastContext)
}

function useToastContextValue() {
  const [toasts, setToasts] = useState([])

  const createToast = useCallback((toast) => {
    setToasts((prevToasts) => [...prevToasts, { id: window.crypto.randomUUID(), text: toast.text, variant: toast.variant }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id))
  }, [])

  return useMemo(() => ({
    toasts,
    createToast,
    removeToast
  }), [createToast, removeToast, toasts])
}

function ToastProvider({children}) {
  const context = useToastContextValue()

  return <ToastContext.Provider value={context}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
