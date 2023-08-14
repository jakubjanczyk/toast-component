import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { useToastContext } from '../ToastProvider'

function ToastShelf() {
  const {toasts, removeToast} = useToastContext()

  if (toasts.length === 0) {
    return null
  }
  return (
    <ol className={styles.wrapper}>
      {toasts.map(toast => (
        <li key={toast.id}>
          <Toast variant={toast.variant} onDismiss={() => removeToast(toast.id)}>{toast.text}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
