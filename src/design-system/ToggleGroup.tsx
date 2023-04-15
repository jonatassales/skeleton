import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { styled } from '@stitches/react'

export const ToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: '#DCDFEA',
  borderRadius: 6,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
})

export const ToggleGroupItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: 'white',
  color: '#42307D',
  height: 35,
  width: 35,
  display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:first-child': { marginLeft: 0, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
  '&:last-child': { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  '&:hover': { backgroundColor: '#F9F5FF' },
  '&[data-state=on]': { backgroundColor: '#F4EBFF' },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` }
})
