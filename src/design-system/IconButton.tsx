import { styled } from '@stitches/react'

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '$round',
  height: 35,
  width: 35,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$primary-main',
  backgroundColor: '$white',
  boxShadow: '$shadow',
  cursor: 'pointer',
  '&:hover': { backgroundColor: '$slate-50' },
  '&:focus': { boxShadow: `0 0 0 2px #0F172A` }
})
