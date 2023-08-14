import { useEffect } from 'react'

export function useKeydown(key, callback) {
  useEffect(() => {
    function onEscapePress(event) {
      if (event.code === key) {
        callback()
      }
    }

    window.addEventListener('keydown', onEscapePress)

    return () => {
      window.removeEventListener('keydown', onEscapePress)
    }
  }, [callback, key])
}
