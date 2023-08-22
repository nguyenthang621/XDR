import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaRegister } from 'src/utils/rules'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import auth from 'src/apis/auth.api'
import { path } from 'src/constants/paths'
import { isEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/Context/app.context'

type FormData = yup.InferType<typeof schemaRegister>

function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schemaRegister) })
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const registerActionMutation = useMutation({
    mutationFn: (body: FormData) => auth.registerAccount(body)
  })
  const onSubmit = handleSubmit((body) => {
    registerActionMutation.mutate(body, {
      onSuccess(data) {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate(path.home)
      },
      onError(error) {
        if (isEntityError<ErrorResponseApi>(error)) {
          const errorForm = error.response?.data
          if (errorForm && errorForm.form) {
            setError('password_confirm', {
              message: errorForm.message,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='flex min-h-screen w-full flex-col justify-center bg-gray-100 py-6 sm:py-12'>
      <div className='relative py-3 sm:mx-auto sm:min-w-[560px]  sm:max-w-xl'>
        {/* <div className='absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl'></div> */}
        <div className='relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20'>
          <div className='mx-auto max-w-md'>
            <div>
              <h1 className='flex items-center justify-center text-2xl font-semibold'>Đăng kí</h1>
            </div>
            <div className='divide-y divide-gray-200'>
              <form className='py-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7' onSubmit={onSubmit}>
                <Input
                  name='fullName'
                  placeholder='Tên người dùng'
                  register={register}
                  type='text'
                  auth
                  errorMessage={errors.fullName?.message}
                ></Input>
                <Input
                  name='email'
                  placeholder='Email'
                  register={register}
                  type='text'
                  auth
                  errorMessage={errors.email?.message}
                ></Input>
                <Input
                  name='password'
                  placeholder='Mật khẩu'
                  register={register}
                  type='password'
                  auth
                  errorMessage={errors.password?.message}
                ></Input>
                <Input
                  name='password_confirm'
                  placeholder='Nhập lại mật khẩu'
                  register={register}
                  type='password'
                  auth
                  errorMessage={errors.password_confirm?.message}
                ></Input>

                <div className='relative mt-12 flex items-center justify-center'>
                  <Button
                    className='w-full rounded-md bg-blue-500 py-2 text-white outline-none hover:bg-blue-500/90'
                    isLoading={registerActionMutation.isLoading}
                    disabled={registerActionMutation.isLoading}
                  >
                    Đăng kí
                  </Button>
                </div>
                <div className='mt-2 flex items-center justify-center text-center text-sm'>
                  <div className='text-slate-400'>Bạn đã có tài khoản?</div>
                  <Link to={path.login} className='ml-1 text-blue-600'>
                    Đăng nhập
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
