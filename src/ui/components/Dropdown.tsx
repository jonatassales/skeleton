import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { styled, keyframes } from '@stitches/react'
import { violet, mauve } from '@radix-ui/colors'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' }
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' }
})

const contentStyles = {
  minWidth: 220,
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade }
  }
}

const DropdownContent = styled(DropdownMenuPrimitive.Content, contentStyles)
const DropdownSubContent = styled(DropdownMenuPrimitive.SubContent, contentStyles)

const DropdownArrow = styled(DropdownMenuPrimitive.Arrow, { fill: 'white' })

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 5px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none'
  },

  '&[data-highlighted]': {
    backgroundColor: violet.violet9,
    color: violet.violet1
  }
}

const DropdownItem = styled(DropdownMenuPrimitive.Item, itemStyles)
const DropdownCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, itemStyles)
const DropdownRadioItem = styled(DropdownMenuPrimitive.RadioItem, itemStyles)
const DropdownSubTrigger = styled(DropdownMenuPrimitive.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: violet.violet4,
    color: violet.violet11
  },
  ...itemStyles
})

const DropdownLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11
})

const DropdownSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5
})

const DropdownItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: mauve.mauve11,
  '[data-highlighted] > &': { color: 'white' },
  '[data-disabled] &': { color: mauve.mauve8 }
})

export function Dropdown(props: DropdownMenuPrimitive.DropdownMenuProps) {
  const { children, ...rootProps } = props

  return <DropdownMenuPrimitive.Root {...rootProps}>{children}</DropdownMenuPrimitive.Root>
}

function Content(props: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>) {
  const { children, ...rest } = props

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownContent {...rest}>
        {children}
        <DropdownArrow />
      </DropdownContent>
    </DropdownMenuPrimitive.Portal>
  )
}

function SubContent(props: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownSubContent {...props} />
    </DropdownMenuPrimitive.Portal>
  )
}

Dropdown.Trigger = DropdownMenuPrimitive.Trigger
Dropdown.Separator = DropdownSeparator
Dropdown.Content = Content
Dropdown.SubContent = SubContent
Dropdown.Label = DropdownLabel
Dropdown.ItemIndicator = DropdownItemIndicator
Dropdown.Item = DropdownItem
Dropdown.SubTrigger = DropdownSubTrigger
Dropdown.Sub = DropdownMenuPrimitive.Sub
Dropdown.CheckboxItem = DropdownCheckboxItem
Dropdown.RadioItem = DropdownRadioItem
Dropdown.RadioGroup = DropdownMenuPrimitive.RadioGroup
Dropdown.RightSlot = RightSlot
