import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Auth } from 'aws-amplify'
import * as Sentry from '@sentry/nextjs'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { Button, Input, Form, FormLabel, FormField, FormMessage, FormControl, FormSubmit, Card } from '@/design-system'
import { AuthLayout } from '@/components'
import { AuthStorageKey, UserStorageKey } from '@/shared/types'

interface EmailValidationSchema {
  email: string
}

interface PasswordValidationSchema {
  password: string
}

interface EmailFormProps {
  setPreferredEmail: React.Dispatch<React.SetStateAction<string | undefined>>
}

interface PasswordFormProps {
  preferredEmail: string
  setPreferredEmail: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const emailSchema = yup
  .object({
    email: yup
      .string()
      .required('E-mail is required')
      .email('Please enter an e-mail address in this format: “example@email.com"')
  })
  .required()

export const passwordSchema = yup
  .object({
    password: yup.string().required('Password is required')
  })
  .required()

const LoginPage: NextPage = () => {
  const [preferredEmail, setPreferredEmail] = React.useState<string>()

  return (
    <AuthLayout>
      <Head>
        <title>Login - Propel</title>
        <meta name="description" content="Login Page" />
      </Head>
      {preferredEmail ? (
        <PasswordForm preferredEmail={preferredEmail} setPreferredEmail={setPreferredEmail} />
      ) : (
        <EmailForm setPreferredEmail={setPreferredEmail} />
      )}
    </AuthLayout>
  )
}

function EmailForm(props: EmailFormProps) {
  const { setPreferredEmail } = props

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors }
  } = useForm<EmailValidationSchema>({ resolver: yupResolver(emailSchema) })

  React.useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const handleEmailFormSubmit: SubmitHandler<EmailValidationSchema> = (data) => {
    setPreferredEmail(data.email)
    window.localStorage.setItem(AuthStorageKey.PreferredLoginEmail, data.email)
  }

  const formDisabled = Boolean(!watch('email') || errors.email)

  return (
    <Card className="px-24 py-20 md:w-[420px] md:px-48 md:py-36">
      <h1 className="mb-7 text-center text-4xl font-medium md:text-left lg:block">Log in</h1>
      <Form onSubmit={handleSubmit(handleEmailFormSubmit)} noValidate>
        <FormField name="email">
          <div className="flex items-baseline justify-between">
            <FormLabel>Email</FormLabel>
            <FormMessage match="valueMissing">Please enter your email</FormMessage>
            <FormMessage match="typeMismatch">Please provide a valid email</FormMessage>
          </div>
          <FormControl asChild>
            <Input {...register('email')} type="email" required />
          </FormControl>
        </FormField>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <FormSubmit asChild>
            <Button variant="primary" type="submit" disabled={formDisabled}>
              Next
            </Button>
          </FormSubmit>
          <Link href="/get-started" passHref>
            <Button variant="outlined">Signup for free</Button>
          </Link>
        </div>
      </Form>
    </Card>
  )
}

function PasswordForm(props: PasswordFormProps) {
  const { preferredEmail, setPreferredEmail } = props

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    watch,
    // setError,
    setFocus,
    formState: { errors }
  } = useForm<PasswordValidationSchema>({ resolver: yupResolver(passwordSchema) })

  const router = useRouter()

  // const queryClient = useQueryClient()

  const cleanupJotaiStorage = () => true

  React.useEffect(() => {
    setFocus('password')
  }, [setFocus])

  const handleEmptyEmail = () => {
    setPreferredEmail('')
    window.localStorage.removeItem(AuthStorageKey.PreferredLoginEmail)
  }

  const handlePasswordFormSubmit: SubmitHandler<PasswordValidationSchema> = async (data) => {
    const { password } = data
    try {
      setIsSubmitting(true)

      const neverLoggedIn = window.localStorage.getItem(AuthStorageKey.NeverLoggedIn)
      const username = window.localStorage.getItem(UserStorageKey.Username)

      const parsedUsername = username ? JSON.parse(username) : null
      const parsedNeverLoggedIn = neverLoggedIn ? JSON.parse(neverLoggedIn) : null

      const user = await Auth.signIn(preferredEmail, password)

      Sentry.setUser({
        id: user.attributes.sub,
        username: user.username,
        email: user.attributes.email
      })

      if (user.username !== parsedUsername) {
        cleanupJotaiStorage()
        // queryClient.removeQueries()
      }

      if (parsedNeverLoggedIn) {
        router.push('/account-creation')
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Something went wrong. Please try again later')
      const tags = { feature: 'login' }
      Sentry.captureException(error, { tags })
    } finally {
      setIsSubmitting(false)
    }
  }

  // const oktaFederatedSignIn = async () => {
  //   try {
  //     Auth.federatedSignIn({ customProvider: 'Okta' })
  //   } catch (error) {
  //     console.error('Something went wrong. Please try again later')
  //     Sentry.captureException(error)
  //   }
  // }

  const formDisabled = Boolean(!watch('password') || errors.password || isSubmitting)

  return (
    <Card className="w-auto max-w-[332px] px-24 py-20 md:max-w-[420px] md:px-48 md:py-36">
      <h1 className="mb-7 text-center text-4xl font-medium md:text-left lg:block">Log in with</h1>
      <div className="mb-40 mt-16 flex items-baseline gap-20">
        <p className="overflow-hidden text-ellipsis text-xl">{preferredEmail}</p>
        <a onClick={handleEmptyEmail}>Change</a>
      </div>
      <Form onSubmit={handleSubmit(handlePasswordFormSubmit)} noValidate>
        <FormField name="password">
          <div className="flex items-baseline justify-between">
            <FormLabel>Password</FormLabel>
            <FormMessage match="valueMissing">Please enter your email</FormMessage>
            <FormMessage match="typeMismatch">Please provide a valid email</FormMessage>
          </div>
          <FormControl asChild>
            <Input {...register('password')} type="password" required />
          </FormControl>
        </FormField>
        <div className="mt-5 grid grid-cols-2 gap-5">
          {/* <FormSubmit asChild> */}
          <Button loading={isSubmitting} onClick={handleSubmit(handlePasswordFormSubmit)} disabled={formDisabled}>
            Login
          </Button>
          {/* </FormSubmit> */}
          <Link className="text-center" href="/password-recovery" passHref>
            Forgot password?
          </Link>
        </div>
      </Form>
    </Card>
  )
}

export default LoginPage
