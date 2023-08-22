import { useContext, useState } from 'react'
import { AppContext } from 'src/Context/app.context'
import DatePickerCustomer from 'src/components/DatePicker/DatePicker'
import InputDropdown from 'src/components/InputDropdown'
import ModalSelectFolder from 'src/components/Modal/ModalSelectFolder'
import { dataMenuUser, errorFormFilter } from 'src/constants/constants'

interface FormDataPayload {
  client_name?: string
  accounts_name?: string[]
  from_connect_time: string
  to_connect_time: string
  data_source_path: string
  destination_path: string
  by_user: string
}

interface ErrorForm {
  client_name?: string
  accounts_name?: string
  from_connect_time?: string
  to_connect_time?: string
  data_source_path?: string
  destination_path?: string
}

interface OptionType {
  value: string
  label: string
}

export default function CardFilter() {
  const { timeConnect } = useContext(AppContext)
  const [nameClient, setNameClient] = useState<OptionType | null>(null)
  const [nameAccount, setNameAccount] = useState<OptionType[] | null>([])
  const [pathSource, setPathSource] = useState<string>('')
  const [pathSave, setPathSave] = useState<string>('')
  const [isShowSelectPathSource, setIsShowSelectPathSource] = useState<boolean>(false)
  const [isShowSelectPathSave, setIsShowSelectPathSave] = useState<boolean>(false)
  const [errorForm, setErrorForm] = useState<ErrorForm>({})

  const optionsNameClient = [
    { value: 'n1', label: 'Name client 1' },
    { value: 'n2', label: 'Name client 2' },
    { value: 'n3', label: 'Name client 3' }
  ]
  const optionsNameAccount = [
    { value: 'c1', label: 'Name account 1' },
    { value: 'c2', label: 'Name account 2' },
    { value: 'c3', label: 'Name account 3' }
  ]
  const handleShowModalSelectFolder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    modal: 'SOURCE_DATA' | 'PATH_SAVE'
  ) => {
    e.preventDefault()
    if (modal == 'SOURCE_DATA') {
      setIsShowSelectPathSave(false)
      setIsShowSelectPathSource((prev) => !prev)
    } else {
      setIsShowSelectPathSource(false)
      setIsShowSelectPathSave((prev) => !prev)
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    let listFormError: {
      [key: string]: string | null | undefined | OptionType[]
    } = {
      client_name: '',
      accounts_name: '',
      from_connect_time: '',
      to_connect_time: '',
      data_source_path: '',
      destination_path: ''
    }
    let result: {
      [key: string]: any
    } = {
      client_name: nameClient?.value,
      accounts_name: nameAccount?.length,
      from_connect_time: timeConnect?.fromConnectTime,
      to_connect_time: timeConnect?.toConnectTime,
      data_source_path: pathSource,
      destination_path: pathSave,
      by_user: 'id_user'
    }
    for (let key in result) {
      console.log(key, errorFormFilter[key])
      if (result.hasOwnProperty(key)) {
        if (!result[key]) {
          listFormError[key] = errorFormFilter[key]
        }
      }
    }
    setErrorForm(listFormError)
  }

  const handleSelectPathSource = (path: string) => {
    setPathSource(path)
    setIsShowSelectPathSource(false)
  }
  const handleSelectPathSave = (path: string) => {
    setPathSave(path)
    setIsShowSelectPathSave(false)
  }

  return (
    <>
      <div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-blueGray-100 shadow-lg'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-0 rounded-t bg-white px-6 py-6 '>
            <div className='flex justify-between text-center'>
              <h6 className='text-xl font-bold text-blueGray-700'>Công Cụ Lọc/Kết Xuất Dữ Liệu CDR</h6>
              <button
                className='bg-xanh mr-1 flex items-center rounded px-6 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-lightBlue-600'
                type='submit'
                onClick={(e) => handleSubmit(e)}
              >
                Lọc
              </button>
            </div>
          </div>
          <div className='flex-auto px-4 py-10 pt-0 lg:px-10'>
            <form className='h-[60vh]'>
              <h6 className='mb-6 mt-3 text-sm font-bold uppercase text-blueGray-400'>Thông tin cần lọc</h6>
              <div className='flex flex-wrap'>
                <div className='w-full px-4 lg:w-6/12'>
                  <div className='mb-3 flex w-full flex-col items-start'>
                    <label className='mb-2 block text-xs font-bold uppercase text-blueGray-600' htmlFor='grid-password'>
                      Khách hàng
                    </label>
                    <InputDropdown
                      setSelect={setNameClient}
                      options={optionsNameClient}
                      checkDisable={(nameAccount && nameAccount?.length > 0) ?? false}
                      currenValue={nameClient}
                      isMulti={false}
                    />
                    <div className='mt-1 min-h-[1.25rem] text-end text-xs text-red-600'>
                      {errorForm.client_name && errorForm.accounts_name ? errorForm.client_name : ''}
                    </div>
                  </div>
                </div>
                <div className='w-full px-4 lg:w-6/12'>
                  <div className='relative mb-3 flex w-full flex-col items-start'>
                    <label className='mb-2 block text-xs font-bold uppercase text-blueGray-600' htmlFor='grid-password'>
                      Tài khoản
                    </label>
                    <InputDropdown
                      setSelect={setNameAccount}
                      options={optionsNameAccount}
                      checkDisable={!!nameClient}
                      currenValue={(nameAccount?.length && nameAccount[0]) || null}
                      isMulti
                    />
                    <div className='min-h-[1.25rem] text-end text-xs text-red-600'>
                      {errorForm.client_name && errorForm.accounts_name ? errorForm.accounts_name : ''}
                    </div>
                  </div>
                </div>

                <div className='relative mt-1 w-full px-4 lg:w-3/12'>
                  <div className='relative mb-3 flex w-full flex-col items-start'>
                    <label className='mb-2 block text-xs font-bold uppercase text-blueGray-600' htmlFor='grid-password'>
                      Nguồn dữ liệu
                    </label>
                    <button
                      className='bg-xanh inline-flex items-center rounded px-4 py-2 text-white hover:shadow'
                      onClick={(e) => handleShowModalSelectFolder(e, 'SOURCE_DATA')}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='mr-1 h-4 w-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776'
                        />
                      </svg>

                      <span>{pathSource ? <p className='text-sm text-white'>{pathSource}</p> : 'Select'}</span>
                    </button>
                    <div className='mt-1 min-h-[1.25rem] text-end text-xs text-red-600'>
                      {errorForm.data_source_path}
                    </div>
                    {isShowSelectPathSource && (
                      <ModalSelectFolder
                        handleClose={() => setIsShowSelectPathSource(false)}
                        data={dataMenuUser}
                        handleSelect={handleSelectPathSource}
                      />
                    )}
                  </div>
                </div>
                <div className='mt-1 w-full px-4 lg:w-3/12'>
                  <div className='relative mb-3 flex w-full flex-col items-start'>
                    <label className='mb-2 block text-xs font-bold uppercase text-blueGray-600' htmlFor='grid-password'>
                      Lưu dữ liệu
                    </label>

                    <button
                      className='bg-xanh inline-flex items-center rounded px-4 py-2 text-white hover:shadow'
                      onClick={(e) => handleShowModalSelectFolder(e, 'PATH_SAVE')}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='mr-1 h-4 w-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                        />
                      </svg>

                      <span>
                        <span>{pathSave ? <p className='text-sm text-white'>{pathSave}</p> : 'Select'}</span>
                      </span>
                    </button>
                    <div className='mt-1 min-h-[1.25rem] text-end text-xs text-red-600'>
                      {errorForm.destination_path}
                    </div>
                    {isShowSelectPathSave && (
                      <ModalSelectFolder
                        handleClose={() => setIsShowSelectPathSave(false)}
                        data={dataMenuUser}
                        handleSelect={handleSelectPathSave}
                      />
                    )}
                  </div>
                </div>
                <div className='px-4 lg:w-6/12'>
                  <div className='relative mb-3 flex w-full flex-col items-start'>
                    <label className='mb-2 block text-xs font-bold uppercase text-blueGray-600' htmlFor='grid-password'>
                      Thời gian
                    </label>
                    <DatePickerCustomer />
                    <div className='min-h-[1.25rem] text-end text-xs text-red-600'>{errorForm.to_connect_time}</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </form>
      </div>
    </>
  )
}
