import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Auth } from 'aws-amplify'
import * as Sentry from '@sentry/nextjs'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { AuthStorageKey, UserStorageKey } from '@/shared/types'

interface EmailValidationSchema {
  email: string
}

interface PasswordValidationSchema {
  password: string
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

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors }
  } = useForm<EmailValidationSchema>({ resolver: yupResolver(emailSchema) })

  React.useEffect(() => {
    setFocus('email')
    const storedPreferredEmail = window.localStorage.getItem(AuthStorageKey.PreferredLoginEmail)
    if (storedPreferredEmail) {
      setPreferredEmail(storedPreferredEmail)
    }
  }, [setFocus])

  const handleEmailFormSubmit: SubmitHandler<EmailValidationSchema> = (data) => {
    setPreferredEmail(data.email)
    window.localStorage.setItem('PreferredLoginEmail', data.email)
  }

  const oktaFederatedSignIn = async () => {
    try {
      Auth.federatedSignIn({ customProvider: 'Okta' })
    } catch (error) {
      console.log('Something went wrong. Please try again later')
      Sentry.captureException(error)
    }
  }

  const formDisabled = Boolean(!watch('email') || errors.email)

  return (
    <>
      <Head>
        <title>Login - Propel</title>
        <meta name="description" content="Login Page" />
      </Head>
      <div className="flex h-[100vh] w-[100vw] items-center justify-center lg:grid lg:grid-cols-2">
        <div className="hidden lg:flex lg:h-full lg:items-center lg:justify-center lg:bg-gradient-to-tl lg:from-primary lg:to-40%">
          <Image src="/images/paulina.svg" alt="Paulina mascot" width={240} height={180} />
        </div>
        <div className="flex w-full items-center justify-center justify-self-center md:w-[80%] lg:w-full">
          {preferredEmail ? (
            <PasswordForm preferredEmail={preferredEmail} setPreferredEmail={setPreferredEmail} />
          ) : (
            <div className="w-[80%] md:w-[70%] lg:w-[400px]">
              <div className="m-20 flex justify-center lg:hidden">img</div>
              <h1 className="hidden text-center lg:block lg:text-left">Log in</h1>
              <form
                className="flex w-full flex-col"
                onSubmit={handleSubmit(handleEmailFormSubmit)}
                autoComplete="off"
                noValidate
              >
                <input {...register('email')} />
                {!!errors.email && <span>{errors.email.message}</span>}
                <div className="mt-20 flex flex-col items-baseline justify-center gap-16 sm:flex-row">
                  <button className="btn-primary w-full sm:w-208 lg:grow" type="submit" disabled={formDisabled}>
                    Next
                  </button>
                  <Link href="/get-started" passHref>
                    <button className="w-full sm:w-208 lg:grow" style={{ textTransform: 'uppercase' }}>
                      Sign up for free
                    </button>
                  </Link>
                </div>
                ---
                <span className="font-semiBold text-slate-400">OR</span>
                ---
                <div className="flex w-full flex-col">
                  <button
                    className="h-44 w-full bg-black text-white"
                    style={{ textTransform: 'uppercase' }}
                    onClick={oktaFederatedSignIn}
                  >
                    okta signin
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function PasswordForm(props: PasswordFormProps) {
  const { preferredEmail, setPreferredEmail } = props

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setFocus,
    formState: { errors }
  } = useForm<PasswordValidationSchema>({ resolver: yupResolver(passwordSchema) })

  const router = useRouter()

  // const queryClient = useQueryClient()

  const cleanupJotaiStorage = () => console.log('cleanup')

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
      console.log('Something went wrong. Please try again later')
      const tags = { feature: 'login' }
      Sentry.captureException(error, { tags })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formDisabled = Boolean(!watch('password') || errors.password || isSubmitting)

  return (
    <div className="w-[80%] md:w-[70%] lg:w-[400px]">
      <div className="m-20 flex justify-center lg:hidden">IMG</div>
      <h1 className="mb-10 hidden text-center text-3xl lg:block lg:text-left">Log in with</h1>
      <div className="mb-40 mt-16 flex items-baseline gap-20">
        <p className="overflow-hidden text-ellipsis text-2xl">{preferredEmail}</p>
        <a onClick={handleEmptyEmail}>Change</a>
      </div>
      <form
        className="flex w-full flex-col"
        onSubmit={handleSubmit(handlePasswordFormSubmit)}
        autoComplete="off"
        noValidate
      >
        <input {...register('password')} type="password" />
        {!!errors.password && <span>{errors.password.message}</span>}
        <div className="mt-20 flex items-baseline justify-center gap-14">
          <button className="flex-1" type="submit" disabled={formDisabled} style={{ textTransform: 'uppercase' }}>
            Login
          </button>
          <Link className="flex-1 text-center" href="/password-recovery" passHref>
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
