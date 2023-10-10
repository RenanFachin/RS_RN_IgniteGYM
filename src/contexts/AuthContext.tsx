import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken"
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>; // promise pq é async
  isLoadingUserStorageData: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


type AuthContextProviderProps = {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState<boolean>(true)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {

    // Anexando no cabeçalho das requisições o token
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(userData)

  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/sessions', { email, password })

      // Caso exista um usuário retornado pelo back-end e exista o token jwt
      if (response.data.user && response.data.token) {
        setIsLoadingUserStorageData(true)

        await storageUserAndTokenSave(response.data.user, response.data.token)

        // salvando os dados no storage e o token
        userAndTokenUpdate(response.data.user, response.data.token)
      }

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserDataFromStorage() {
    try {
      setIsLoadingUserStorageData(true)

      // Caso exista algo no storage do usuário, atualizar o state
      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      // Limpando o state
      setUser({} as UserDTO)

      // Limpando o storage
      await storageUserRemove()
      await storageAuthTokenRemove()

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserDataFromStorage()

  }, [])

  return (
    <AuthContext.Provider value={{ user: user, signIn, isLoadingUserStorageData, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}