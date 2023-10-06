// https://reactnavigation.org/docs/bottom-tab-navigator/
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'

// https://reactnative.dev/docs/platform
import { Platform } from 'react-native'

import HomeSVG from '@assets/home.svg'
import HistorySVG from '@assets/history.svg'
import ProfileSVG from '@assets/profile.svg'

import { Home } from '@screens/Home'
import { History } from '@screens/History'
import { Profile } from '@screens/Profile'
import { Exercise } from '@screens/Exercise'

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const theme = useTheme()

  // Definindo o tamanho em uma constante auxiliar
  const iconSize = theme.sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: theme.colors.green[500],
      tabBarInactiveTintColor: theme.colors.gray[200],
      tabBarStyle: {
        backgroundColor: theme.colors.gray[600],
        borderTopWidth: 0,
        // Diferenciando o tamanho conforme o ambiente
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: theme.sizes[10],
        paddingTop: theme.sizes[6]
      }
    }}
    >
      {/* A ordem importa */}
      <Screen
        name='home'
        component={Home}
        options={
          {
            tabBarIcon: ({ color }) => (
              <HomeSVG
                fill={color}
                width={iconSize}
                height={iconSize}
              />
            )
          }
        }
      />

      <Screen
        name='history'
        component={History}
        options={
          {
            tabBarIcon: ({ color }) => (
              <HistorySVG
                fill={color}
                width={iconSize}
                height={iconSize}
              />
            )
          }
        }
      />

      <Screen
        name='profile'
        component={Profile}
        options={
          {
            tabBarIcon: ({ color }) => (
              <ProfileSVG
                fill={color}
                width={iconSize}
                height={iconSize}
              />
            )
          }
        }
      />


      <Screen
        name='exercise'
        component={Exercise}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}