import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const nativeBaseTheme = useTheme()

  // se tiver conteúdo dentro de user -> usuário logado
  const { user } = useAuth()

  const theme = DefaultTheme;
  theme.colors.background = nativeBaseTheme.colors.gray[700]

  return (
    // Box é para evitar um glith de navegação
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}