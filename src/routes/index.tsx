import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { AuthContext } from '@contexts/AuthContext'
import { useContext } from 'react'

export function Routes() {
  const nativeBaseTheme = useTheme()

  const contextData = useContext(AuthContext)
  console.log(contextData)

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