import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Center, HStack, Link, Text, useToast, VStack } from 'native-base'
import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import { Layout } from '../../components/Layout'
import { Logo } from '../../components/Logo'
import { RDButton } from '../../components/RDButton'
import { RDInput } from '../../components/RDInput'
import { RDText } from '../../components/RDText'
import { LoginForm, RootStackParamList } from '../../constants/types'
import { localActions } from './loginHelpers'

export function Login(props: NativeStackScreenProps<RootStackParamList>) {
    const [form, setForm] = useState<LoginForm>({
        email: { value: '', error: '' },
        password: { value: '', error: '' },
    })

    const [loading, setLoading] = useState(false)

    const toast = useToast()

    const {
        onChange,
        onBlur,
        clearFormErrors,
        validateForm,
        signIn,
        resolveValueObject,
    } = localActions(setForm, setLoading)

    async function login() {
        Keyboard.dismiss()

        clearFormErrors()

        const formValues = resolveValueObject(form)
        const formIsValid = validateForm(formValues, toast)
        if (!formIsValid) return

        signIn(props.navigation.navigate, toast)
    }

    return (
        <Layout>
            <Center h='full' w='full'>
                <VStack w='full' alignItems='center' px={5}>
                    <HStack w='full' justifyContent='center'>
                        <Logo />
                        <RDText fontSize='3xl'>RiDiet</RDText>
                    </HStack>

                    <RDText fontSize='2xl'>Login</RDText>

                    <RDInput
                        my={2}
                        placeholder='Email'
                        fontSize='xl'
                        onChangeText={onChange('email')}
                        value={form.email.value}
                        error={form.email.error}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onBlur={() => {
                            onBlur('email')
                        }}
                    />

                    <RDInput
                        my={2}
                        type='password'
                        placeholder='Password'
                        fontSize='xl'
                        onChangeText={onChange('password')}
                        value={form.password.value}
                        error={form.password.error}
                        onBlur={() => {
                            onBlur('password')
                        }}
                    />

                    <RDButton
                        w='full'
                        title='Login'
                        mt='3'
                        onPress={login}
                        isLoading={loading}
                        isLoadingText={'Logging In...'}
                    />

                    <HStack space={2} mt={2}>
                        <Text fontSize={16} color={'grey2'}>
                            New to RiDiet?
                        </Text>
                        <Link
                            onPress={() =>
                                props.navigation.navigate('Register')
                            }
                        >
                            <Text fontSize={16} color={'blue1'}>
                                Create new account
                            </Text>
                        </Link>
                    </HStack>

                    {/* <RDText my={5} fontSize='lg'>
                        or
                    </RDText>

                    <Button
                        onPress={() => {
                            ;(async () => {})()
                        }}
                    >
                        Continue with google
                    </Button> */}
                </VStack>
            </Center>
        </Layout>
    )
}
