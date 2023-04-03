import * as FormPrimitive from '@radix-ui/react-form'
import { styled } from '@stitches/react'

export const Form = FormPrimitive.Root

export const FormField = styled(FormPrimitive.Field, {
  display: 'grid',
  marginBottom: 10
})

export const FormLabel = styled(FormPrimitive.Label, {
  fontSize: 15,
  fontWeight: 500,
  lineHeight: '35px',
  color: 'black'
})

export const FormMessage = styled(FormPrimitive.Message, {
  fontSize: 13,
  color: 'black',
  opacity: 0.8
})

export const FormControl = FormPrimitive.Control

export const FormSubmit = FormPrimitive.Submit
