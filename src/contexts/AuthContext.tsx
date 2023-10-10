import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

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

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/sessions', { email, password })

      // Caso exista um usuário retornado pelo back-end
      if (response.data.user) {
        setUser(response.data.user)

        // salvando os dados no storage
        storageUserSave(response.data.user)
      }

    } catch (error) {
      throw error;
    }
  }

  async function loadUserDataFromStorage() {
    try {
      // Caso exista algo no storage do usuário, atualizar o state
      const userLogged = await storageUserGet()

      if (userLogged) {
        setUser(userLogged)
        setIsLoadingUserStorageData(false)
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