'use client'

import { useLoginMutation, useRegisterMutation } from '@/store/auth/authApi'
import { authFormSchema } from '@/utils/formSchemas/authFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import CustomInput from './CustomInput'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { showErrorToast } from '@/utils/showErrorToast'
import { IFormCredentials } from '../types'
import toast from 'react-hot-toast'

interface AuthFormProps {
  type: 'login' | 'register'
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter()

  const [signIn] = useLoginMutation()
  const [signUp] = useRegisterMutation()
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(authFormSchema(type)),
  })

  const onSubmit = async (data: IFormCredentials) => {
    try {
      console.log(data)

      if (type === 'register') {
        await signUp(data).unwrap()

        toast.success('You have successfully registered.')
        setTimeout(() => {
          router.push('/sign-in')
        }, 1500)
      } else {
        await signIn(data).unwrap()
        toast.success('Welcome back, friend!')
        // setTimeout(() => {
        //   router.push('/')
        // }, 1500)
      }
    } catch (error) {
      showErrorToast(error)
    }
  }

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    console.log(`Signing in with ${provider}`)
  }

  return (
    <div
      className={`absolute top-0 h-auto min-h-full w-1/2 bg-dark/90 border border-gray-700 p-4 shadow-lg flex flex-col justify-center transition-transform duration-700 ease-in-out ${
        type === 'register' ? 'translate-x-full' : 'translate-x-0'
      }`}
    >
      <h2 className="flex text-white text-3xl font-bold mb-2 justify-center">
        {type === 'login' ? 'Welcome Back!' : 'Create an Account'}
      </h2>

      {/* OAuth Buttons (Icons Only) */}
      <div className="flex justify-center gap-4 mb-2">
        <button
          onClick={() => handleOAuthSignIn('google')}
          className="p-1 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <FcGoogle size={24} />
        </button>

        <button
          onClick={() => handleOAuthSignIn('github')}
          className="p-1 text-white rounded-full shadow-md hover:bg-gray-700 transition"
        >
          <FaGithub size={24} />
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
        />

        {type === 'register' && (
          <div className="grid grid-cols-1 gap-4">
            <CustomInput
              control={control}
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name="firstName"
                label="First Name"
                placeholder="Ivan"
              />
              <CustomInput
                control={control}
                name="lastName"
                label="Last Name"
                placeholder="Lisovenko"
              />
            </div>
          </div>
        )}

        <CustomInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="flex flex-col text-center mt-4">
        <Link
          href={type === 'login' ? '/sign-up' : '/sign-in'}
          className="text-white text-sm hover:underline"
        >
          {type === 'login'
            ? 'New here? Create an account'
            : 'Already have an account? Sign In'}
        </Link>
        {type === 'login' && (
          <Link href={'/forgot-password'}>Forgot your password?</Link>
        )}
      </div>
    </div>
  )
}

export default AuthForm
