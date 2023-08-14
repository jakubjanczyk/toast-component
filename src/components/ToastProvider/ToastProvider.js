import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

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

  useEffect(() => {
    function onEscapePress(event) {
      if (event.code === 'Escape') {
        setToasts([])
      }
    }

    window.addEventListener('keydown', onEscapePress)

    return () => {
      window.removeEventListener('keydown', onEscapePress)
    }
  }, [])

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
