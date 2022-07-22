import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../constants/types'

const Router = createNativeStackNavigator<RootStackParamList>()

const Navigator = Router.Navigator as any
const Screen = Router.Screen

export { Navigator, Screen }
