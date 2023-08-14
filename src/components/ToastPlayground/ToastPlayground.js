import React, { useReducer, useState } from 'react'

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf'
import { useToasts } from '../ToastProvider'

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

const setMessage = (message) => ({type: 'SET_MESSAGE', payload: message})
const setVariant = (variant) => ({type: 'SET_VARIANT', payload: variant})
const clear = () => ({type: 'CLEAR'})

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
    case 'CLEAR':
      return {
        ...state,
        variant: VARIANT_OPTIONS[0],
        message: ''
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

  const toastContext = useToasts()

  const createToast = (e) => {
    e.preventDefault()
    toastContext.createToast({text: toastState.message, variant: toastState.variant})
    dispatch(clear())
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={createToast}>
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
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
