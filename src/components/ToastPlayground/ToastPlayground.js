import React, { useReducer } from 'react'

import Button from '../Button';

import styles from './ToastPlayground.module.css';

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
  const [state, dispatch] = useReducer(reducer, {
    message: '',
    variant: VARIANT_OPTIONS[0]
  })

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

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
            <textarea id="message" className={styles.messageInput} value={state.message} onChange={e => dispatch(setMessage(e.currentTarget.value))} />
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
                  checked={state.variant === variant}
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
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
