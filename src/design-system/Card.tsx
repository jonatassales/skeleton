import { styled } from '@stitches/react'

const StyledCard = styled('div', {
  borderRadius: '12px',
  backgroundColor: '#ffffff'
})

export const Card = ({ className, ...props }) => {
  return <StyledCard className={`${StyledCard.className} ${className}`} {...props} />
}
