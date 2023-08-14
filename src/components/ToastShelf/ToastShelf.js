import React from 'react'

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { useToasts } from '../ToastProvider'

function ToastShelf() {
  const {toasts, removeToast} = useToasts()

  if (toasts.length === 0) {
    return null
  }
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification">
      {toasts.map(toast => (
        <li key={toast.id}>
          <Toast variant={toast.variant} onDismiss={() => removeToast(toast.id)}>{toast.text}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
