import React from 'react'
import { styled, keyframes } from '@stitches/react'

const rotation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

const SpinnerNode = styled('span', {
  borderWidth: '2px',
  borderStyle: 'solid',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  animation: `${rotation} 1s linear infinite`
})

export interface SpinnerProps extends React.ComponentProps<typeof SpinnerNode> {
  primaryColor?: string
  secondaryColor?: string
  thickness?: number
  size: number
}

export function Spinner(props: SpinnerProps) {
  const { size = 20, primaryColor = '#FFF', secondaryColor = 'transparent', thickness = 2 } = props

  return (
    <SpinnerNode
      css={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderColor: primaryColor,
        borderBottomColor: secondaryColor
      }}
    />
  )
}
