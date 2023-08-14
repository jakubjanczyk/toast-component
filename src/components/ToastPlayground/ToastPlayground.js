import React, { useReducer, useState } from 'react'

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import Toast from '../Toast'

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

const setMessage = (message) => ({type: 'SET_MESSAGE', payload: message})
const setVariant = (variant) => ({type: 'SET_VARIANT', payload: variant})

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    case 'SET_VARIANT':
      return {
        ...state,
        variant: action.payload
      }
    default:
      return state
  }
}

function ToastPlayground() {
  const [toastState, dispatch] = useReducer(reducer, {
    message: '',
    variant: VARIANT_OPTIONS[0]
  })

  const [showToast, setShowToast] = useState(false)

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {showToast ? (
        <Toast text={toastState.message} variant={toastState.variant} onDismiss={() => setShowToast(false)}/>
      ) : null}

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={toastState.message} onChange={e => dispatch(setMessage(e.currentTarget.value))} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(variant => {
              return (
                <label htmlFor={`variant-${variant}`} key={variant}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={toastState.variant === variant}
                  onChange={() => dispatch(setVariant(variant))}
                />
                  {variant}
              </label>
              )})}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button onClick={() => setShowToast(true)}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
