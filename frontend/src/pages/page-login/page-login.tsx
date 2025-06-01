'use client'
import Image from 'next/image'

import { IconGoogle } from '@/assets/icons/icon-google'
import { backgroundloginpage, imageLogo } from '@/assets/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DataLoginUser } from '@/dto/data-login-user-DTO'
import { loginUserSchema } from '@/schemas/user-schema'
import { LoginUser } from '@/services/routes/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const LoginPage = () => {
  //Manipulate of login User
  const router = useRouter()
  //State for storage value remember me
  const [rememberMe, setRememberMe] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DataLoginUser>({
    resolver: zodResolver(loginUserSchema),
  })

  //Function Submited Form and login
  async function onSubmit(data: DataLoginUser) {
      const response = await LoginUser(data)
      router.push("/administrative")
  }

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* FORM CONTAINER */}
      <div className="flex min-h-screen w-full flex-col items-start justify-between bg-white px-10 py-10 lg:w-[50%]">
        {/* Logo */}
        <div className="flex w-full items-center justify-center">
          <Image src={imageLogo} alt="System logo" />
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-6"
        >
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[2rem] font-bold text-primargreen">BEM VINDO(A) DE VOLTA 👋</h1>
            <p className="w-[70%] text-[0.9rem] text-primargreen max-lg:w-[90%]">
              Retome o controle dos eventos e pontos turísticos da sua cidade com eficiência
            </p>
          </div>

          {/* Email */}
          <div className="flex w-full flex-col items-start gap-1">
            <label htmlFor="email" className="font-medium text-primargreen">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              autoComplete="email"
              id="email"
              name="email"
              className="w-full rounded-lg border-2 border-black/10 p-2 outline-none transition-all ease-in-out focus:border-2 focus:border-primargreen"
            />
            {errors && (
              <div className="flex w-full items-start justify-start">
                <p className="text-[1rem] text-red-600">{errors.email?.message}</p>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="flex w-full flex-col items-start gap-1">
            <label htmlFor="password" className="font-medium text-primargreen">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              id="password"
              name="password"
              className="w-full rounded-lg border-2 border-black/10 p-2 outline-none transition-all ease-in-out focus:border-2 focus:border-primargreen"
            />
            {errors && (
              <div className="flex w-full items-start justify-start">
                <p className="text-[1rem] text-red-600">{errors.password?.message}</p>
              </div>
            )}
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex w-full items-center justify-between text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("remenberMe")} id="rememberMe" />
              <label htmlFor="rememberMe" className="text-primargreen">
                Lembrar de min
              </label>
            </div>
            <p>
              Esqueceu senha?{' '}
              <a href="#" className="text-primargreen underline">
                Clique aqui
              </a>
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-primargreen py-3 font-bold text-white transition-all hover:brightness-90"
          >
            FAZER LOGIN
          </button>

          {/* Divider with lines */}
          <div className="flex w-full items-center justify-center gap-4 text-[1.2rem] text-primargreen">
            <hr className="flex-grow border border-primargreen" />
            <p className="whitespace-nowrap">Ou continue com</p>
            <hr className="flex-grow border border-primargreen" />
          </div>

          {/* Google Button */}
          <button className="flex w-[80%] items-center justify-center gap-3 rounded-full border-2 border-primargreen p-4">
            <IconGoogle />
            Continue com Google
          </button>
        </form>

        {/* Contact */}
        <div className="mt-10 flex w-full items-center justify-center">
          <h4 className="text-[1.2rem] font-medium text-primargreen">Entre em Contate</h4>
        </div>
      </div>

      {/* Background image container */}
      <div className="relative hidden min-h-[100vh] w-full lg:block">
        <Image
          src={backgroundloginpage}
          alt="Login page background image"
          fill
          className="object-cover"
        />
      </div>
    </main>
  )
}
