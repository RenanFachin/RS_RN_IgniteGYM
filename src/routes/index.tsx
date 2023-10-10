import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const nativeBaseTheme = useTheme()

  const { user } = useAuth()
  console.log(user)

  const theme = DefaultTheme;
  theme.colors.background = nativeBaseTheme.colors.gray[700]

  return (
    // Box é para evitar um glith de navegação
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </Box>
  )
}