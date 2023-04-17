// Button.tsx
import React from 'react'
import { styled } from '@stitches/react'

import { Spinner } from '@/design-system'

const ButtonWrapper = styled('button', {
  whiteSpace: 'nowrap',
  height: '48px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 32px',
  borderRadius: '6px',
  border: '1px solid #8A3FFF',
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
        backgroundColor: 'white',
        color: '#7f56d9',
        border: '2px solid #d6bbfb',
        fontWeight: 400,
        '&:hover': {
          backgroundColor: '#f1eafe'
        }
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#7f56d9',
        border: 'none',
        fontWeight: 400,
        '&:hover': {
          color: '#42307D'
        }
      }
    }
  }
})

interface ButtonProps extends React.ComponentProps<typeof ButtonWrapper> {
  children: React.ReactNode
  variant?: 'primary' | 'outlined' | 'ghost'
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

  const primaryColor = {
    primary: '#FFF',
    outlined: '#7169e2',
    ghost: '#7169e2'
  }[variant]

  return (
    <ButtonWrapper ref={ref} variant={variant} {...rest}>
      {leftIcon && <ButtonLeftIcon>{leftIcon}</ButtonLeftIcon>}
      {loading ? <Spinner size={18} primaryColor={primaryColor} /> : children}
      {rightIcon && <ButtonRightIcon>{rightIcon}</ButtonRightIcon>}
    </ButtonWrapper>
  )
})

Button.displayName = 'Button'
