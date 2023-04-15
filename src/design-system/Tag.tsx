import React from 'react'
import { styled } from '@stitches/react'
import { X } from '@phosphor-icons/react'

export interface TagProps extends React.ComponentProps<typeof StyledTag> {
  children: string
  onDelete?: () => void
  controllable?: boolean
}

const StyledTag = styled('span', {
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  position: 'relative',
  borderRadius: '16px',
  padding: '2px 8px',

  '& > span': {
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const { controllable = false, onDelete, className, children } = props

  const [hidden, setHidden] = React.useState(false)

  const handleDelete = () => {
    setHidden(true)
    onDelete()
  }

  if (hidden) return null

  return (
    <StyledTag ref={ref} className={className}>
      <span className={className}>{children}</span>
      {controllable && onDelete && (
        <button onClick={handleDelete}>
          <X />
        </button>
      )}
    </StyledTag>
  )
})

Tag.displayName = 'Tag'
