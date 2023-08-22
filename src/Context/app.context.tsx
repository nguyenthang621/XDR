import { createContext, useState } from 'react'
import { TimeConnect, User } from 'src/types/user.type'
import { LocalStorage } from 'src/utils/localStorage'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>

  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>

  isShowModalSelectPath: 'SOURCE_DATA' | 'PATH_SAVE' | null
  setIsShowModalSelectPath: React.Dispatch<React.SetStateAction<'SOURCE_DATA' | 'PATH_SAVE' | null>>
  timeConnect: TimeConnect | null
  setTimeConnect: React.Dispatch<React.SetStateAction<TimeConnect | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: true,
  // isAuthenticated: Boolean(LocalStorage.getItemStorage('access_token')),
  setIsAuthenticated: () => null,
  profile: JSON.parse(LocalStorage.getItemStorage('profile') as string),
  setProfile: () => null,
  isShowModalSelectPath: null,
  setIsShowModalSelectPath: () => null,

  timeConnect: { fromConnectTime: '', toConnectTime: '' },
  setTimeConnect: () => null
}

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [timeConnect, setTimeConnect] = useState<TimeConnect | null>(initialAppContext.timeConnect)
  const [isShowModalSelectPath, setIsShowModalSelectPath] = useState<'SOURCE_DATA' | 'PATH_SAVE' | null>(
    initialAppContext.isShowModalSelectPath
  )

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        isShowModalSelectPath,
        setIsShowModalSelectPath,
        timeConnect,
        setTimeConnect
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
