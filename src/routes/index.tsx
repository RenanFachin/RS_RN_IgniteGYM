import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'

export function Routes() {
  const nativeBaseTheme = useTheme()

  // se tiver conteúdo dentro de user -> usuário logado
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme;
  theme.colors.background = nativeBaseTheme.colors.gray[700]

  // Caso isLoadingUserStorageData seja true, quer dizer que os dados ainda estão sendo carregados do storage e portanto, devemos mostrar um loading
  if(isLoadingUserStorageData){
    return <Loading />
  }

  return (
    // Box é para evitar um glith de navegação
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}