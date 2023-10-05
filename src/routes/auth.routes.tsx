// https://reactnavigation.org/docs/getting-started/
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import { SignIn } from '@screens/Signin'
import { SignUp } from '@screens/SignUp'

// https://reactnavigation.org/docs/typescript/
type AuthRoutes = {
  signIn: undefined;
  register: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='signIn' component={SignIn} />
      <Screen name='register' component={SignUp} />
    </Navigator>
  )
}