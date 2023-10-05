import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'

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
    <Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
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


      <Screen name='exercise' component={Exercise} />
    </Navigator>
  )
}