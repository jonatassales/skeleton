import React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { styled } from '@stitches/react'
import { violet, mauve, blackA } from '@radix-ui/colors'

const SCROLLBAR_SIZE = 10

const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root, {
  width: '100%',
  height: '100%',
  background: 'transparent'
})

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%'
})

const ScrollAreaScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: blackA.blackA6,
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE
  }
})

const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44
  }
})

const ScrollAreaCorner = styled(ScrollAreaPrimitive.Corner, {
  background: blackA.blackA8
})

interface ListProps {
  children: React.ReactNode
}

export function ScrollArea(props: ListProps) {
  const { children } = props
  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>{children}</ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
}
