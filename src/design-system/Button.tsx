// Button.tsx
import React from 'react'
import { styled } from '@stitches/react'

import { Spinner } from '@/design-system'

const ButtonWrapper = styled('button', {
  width: '100%',
  whiteSpace: 'nowrap',
  height: 40,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px 12px',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: 500,
  letterSpacing: '-0.025em',
  cursor: 'pointer',
  outline: 'none',
  transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',

  variants: {
    variant: {
      primary: {
        backgroundColor: '#7169e2',
        color: 'white',
        '&:hover': {
          backgroundColor: '#5a50ca'
        }
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#7169e2',
        border: '1px solid #7169e2',
        '&:hover': {
          backgroundColor: '#eeecfb'
        }
      }
    }
  }
})

interface ButtonProps extends React.ComponentProps<typeof ButtonWrapper> {
  children: React.ReactNode
  variant?: 'primary' | 'outlined'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
}

export const ButtonLeftIcon = styled('span', {
  display: 'flex',
  alignItems: 'center',
  marginRight: 8
})

export const ButtonRightIcon = styled('span', {
  display: 'flex',
  alignItems: 'center',
  marginLeft: 8
})

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, variant = 'primary', leftIcon, rightIcon, loading = false, ...rest } = props

  const mainNode = [leftIcon, children, rightIcon]

  const primaryColor = {
    primary: '#FFF',
    outlined: '#7169e2'
  }[variant]

  return (
    <ButtonWrapper ref={ref} variant={variant} {...rest}>
      {loading ? <Spinner size={18} primaryColor={primaryColor} /> : mainNode}
    </ButtonWrapper>
  )
})

Button.displayName = 'Button'