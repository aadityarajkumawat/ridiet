import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { NativeBaseProvider } from 'native-base'
import { useState } from 'react'
import { auth } from './configs/firebase.config'
import { Navigator, Screen } from './configs/Navigator'
import { theme } from './configs/styleConfig'
import { Home } from './Screens/Home'
import { Login } from './Screens/Login'
import { Register } from './Screens/Register'
import { SelectDiet } from './Screens/SelectDiet'
import { SelectDiseases } from './Screens/SelectDiseases'
import { StartScreen } from './Screens/StartScreen'

function useAuthenticated() {
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    onAuthStateChanged(auth, (user) => {
        setAuthenticated(!!user)
    })

    return authenticated
}

export default function App() {
    const authenticated = useAuthenticated()

    const [fontsLoaded] = useFonts({ inter400R: Inter_400Regular })

    if (!fontsLoaded) return null

    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <Navigator>
                    {!authenticated ? (
                        <>
                            <Screen
                                name='StartScreen'
                                component={StartScreen}
                                options={{ headerShown: false }}
                            />
                            <Screen
                                name='Login'
                                component={Login}
                                options={{ headerShown: false }}
                            />
                            <Screen
                                name='Register'
                                component={Register}
                                options={{ headerShown: false }}
                            />
                        </>
                    ) : (
                        <>
                            <Screen
                                name='SelectDiseases'
                                component={SelectDiseases}
                                options={{ headerShown: false }}
                            />
                            <Screen
                                name='SelectDiet'
                                component={SelectDiet}
                                options={{ headerShown: false }}
                            />
                            <Screen
                                name='Home'
                                component={Home}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    )
}
