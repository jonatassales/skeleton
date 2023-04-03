// Input.tsx
import React from 'react'
import { styled } from '@stitches/react'

const InputWrapper = styled('input', {
  all: 'unset',
  boxSizing: 'border-box',
  width: '100%',
  height: 42,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#050B49',
  lineHeight: 1,
  padding: '0 10px',
  fontSize: 15,
  color: '#495057',
  backgroundColor: 'white',
  border: '1px solid #ced4da',
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  '&:hover': {
    borderColor: '#dedbf9'
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 0.1rem rgba(113, 105, 226, 0.15)',
    borderColor: '#7169e2'
  },
  '&::selection': {
    backgroundColor: '#7169e2',
    color: 'white'
  },
  '&.error': {
    borderColor: '#dc3545',
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(220, 53, 69, 0.25)'
    }
  }
})

const InputErrorMessage = styled('p', {
  color: '#dc3545',
  fontSize: '0.8rem',
  marginTop: 4
})

interface InputProps extends React.ComponentProps<typeof InputWrapper> {
  errorMessage?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { errorMessage, ...rest } = props
  const errorClassName = errorMessage ? 'error' : ''

  return (
    <div>
      <InputWrapper className={errorClassName} ref={ref} {...rest} />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = 'Input'
