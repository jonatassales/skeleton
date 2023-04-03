import React from 'react'
import { styled } from '@stitches/react'

import { getValidChildren } from './getValidChildren'

const Container = styled('nav', {
  display: 'flex',
  marginBottom: '15px'
})

const List = styled('ol', {
  display: 'flex',
  gap: '5px'
})

const ListItem = styled('li', {
  display: 'flex',
  gap: '5px',
  fontSize: '14px',
  color: '#5d6b98',

  '& > span': {
    fontSize: '17px',
    alignSelf: 'flex-end'
  },

  '& > a': {
    fontSize: '14px',
    textDecoration: 'none',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    color: 'inherit',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
})

const ListItemCurrent = styled(ListItem, {
  color: '#050B49'
})

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  children: React.ReactNode
  separator?: string
}

export const Breadcrumb = React.forwardRef(function BreadcrumbBase(
  props: BreadcrumbProps,
  ref: React.Ref<HTMLElement>
) {
  const { separator = '/', children, ...rest } = props

  const validChildren = getValidChildren(children)
  const count = validChildren.length

  const clones = validChildren.map((child, index) =>
    React.cloneElement(child, {
      separator,
      isLastChild: count === index + 1
    })
  )

  return (
    <Container aria-label="breadcrumb" ref={ref} {...rest}>
      <List>{clones}</List>
    </Container>
  )
})

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'li'> {
  children: string | JSX.Element
  separator?: string
  isLastChild?: boolean
}

export const BreadcrumbItem = React.forwardRef(function BreadcrumbItemBase(
  props: BreadcrumbItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { children, separator, isLastChild, ...rest } = props
  return isLastChild ? (
    <ListItemCurrent ref={ref} {...rest}>
      {children}
    </ListItemCurrent>
  ) : (
    <ListItem ref={ref} {...rest}>
      {children}
      <span>{separator}</span>
    </ListItem>
  )
})
