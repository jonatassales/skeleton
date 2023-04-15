import React from 'react'
import { styled } from '@stitches/react'

import { Tag } from './Tag'

export interface TagInfoProps extends React.ComponentProps<typeof StyledTagInfo> {
  children: React.ReactElement<React.ComponentPropsWithRef<'p'>>
  label: string
  className: string
}

const StyledTagInfo = styled('div', {
  display: 'flex',
  padding: '6px',
  borderRadius: '16px',

  '& > span': {
    fontWeight: 800,
    fontSize: '12px',
    background: '#FFFFFF',
    border: 'none',
    marginRight: '6px'
  }
})

export const TagInfo = React.forwardRef<HTMLDivElement, TagInfoProps>((props, ref) => {
  const { className, label, children } = props

  return (
    <StyledTagInfo ref={ref} className={className}>
      <Tag>{label}</Tag>
      {children}
    </StyledTagInfo>
  )
})

TagInfo.displayName = 'TagInfo'
