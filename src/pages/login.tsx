import React from 'react'
import type { NextPage } from 'next'
import { useAtomValue } from 'jotai'
import Head from 'next/head'
import Link from 'next/link'
import { Auth } from 'aws-amplify'
import * as Sentry from '@sentry/nextjs'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { usernameAtom } from '@/atoms'
import { AuthLayout } from '@/components'
import { LocalStorage } from '@/shared/types'
import { Button, Input, Form, FormLabel, FormField, FormMessage, FormControl, FormSubmit, Card } from '@/design-system'
import { SIGVTALRM } from 'constants'

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
      <div className="flex h-full w-full items-center justify-center">
        {preferredEmail ? (
          <PasswordForm preferredEmail={preferredEmail} setPreferredEmail={setPreferredEmail} />
        ) : (
          <EmailForm setPreferredEmail={setPreferredEmail} />
        )}
      </div>
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
    window.localStorage.setItem(LocalStorage.PreferredLoginEmail, data.email)
  }

  const formDisabled = Boolean(!watch('email') || errors.email)

  return (
    <Card className="am:px-48 w-full px-24 py-20 sm:absolute sm:right-[10%] sm:top-[30%] sm:w-[420px] sm:py-36">
      <h1 className="mb-7 text-4xl font-medium md:text-left lg:block">Log in</h1>
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

  const username = useAtomValue(usernameAtom)

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
    window.localStorage.removeItem(LocalStorage.PreferredLoginEmail)
  }

  const handlePasswordFormSubmit: SubmitHandler<PasswordValidationSchema> = async (data) => {
    const { password } = data
    try {
      setIsSubmitting(true)

      const neverLoggedIn = JSON.parse(window.localStorage.getItem(LocalStorage.NeverLoggedIn) as string)

      const user = await Auth.signIn(preferredEmail, password)

      Sentry.setUser({
        id: user.attributes.sub,
        username: user.username,
        email: user.attributes.email
      })

      if (user.username !== username) {
        cleanupJotaiStorage()
        // queryClient.removeQueries()
      }

      router.push('/')
      // if (neverLoggedIn) {
      //   router.push('/account-creation')
      // } else {
      //   router.push('/')
      // }
    } catch (error) {
      // console.error('Something went wrong. Please try again later')
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
    <Card className="w-full px-24 py-20 sm:absolute sm:right-[10%] sm:top-[30%] sm:w-[420px] sm:px-48 sm:py-36">
      <h1 className="mb-7 text-center text-4xl font-medium text-primary-900 md:text-left lg:block">Log in with</h1>
      <div className="mb-40 mt-16 flex items-baseline gap-20">
        <p className="w-full overflow-hidden text-ellipsis text-xl text-primary-900">{preferredEmail}</p>
        <a className="text-primary-900" onClick={handleEmptyEmail}>
          Change
        </a>
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
        <div className="mt-5 grid grid-cols-2 items-center gap-5">
          <FormSubmit asChild>
            <Button loading={isSubmitting} onClick={handleSubmit(handlePasswordFormSubmit)} disabled={formDisabled}>
              Login
            </Button>
          </FormSubmit>
          <Link className="flex justify-center" href="/password-recovery" passHref>
            <span className="inline-flex w-full whitespace-nowrap text-primary-900">Forgot password?</span>
          </Link>
        </div>
      </Form>
    </Card>
  )
}

export default LoginPage
