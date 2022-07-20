import { signInWithEmailAndPassword } from 'firebase/auth'
import { Center, HStack, Link, Text, useToast, VStack } from 'native-base'
import React, { SetStateAction, useState } from 'react'
import { Keyboard } from 'react-native'
import { z } from 'zod'
import { Layout } from '../components/Layout'
import { Logo } from '../components/Logo'
import { RDButton } from '../components/RDButton'
import { RDInput } from '../components/RDInput'
import { RDText } from '../components/RDText'
import { Toast } from '../components/Toast'
import { auth } from '../configs/firebase.config'
import { Field, StateSetter } from '../constants/types'

interface LoginForm {
    email: Field
    password: Field
}

const emailValidator = z.string().email({ message: 'Invalid email address' })

const passwordValidator = z
    .string()
    .min(8, { message: 'Password too short' })
    .max(15, { message: 'Password too long' })

const validatorMap = {
    email: emailValidator,
    password: passwordValidator,
}

const formSchema = z.object({
    email: emailValidator,
    password: passwordValidator,
})

function localActions(
    setForm: StateSetter<LoginForm>,
    setLoading: StateSetter<boolean>,
) {
    return {
        onChange: onChangeStateWrapper(setForm),
        onBlur: onBlurWrapper(setForm),
        clearFormErrors: clearFormErrors(setForm),
        validateForm: validateFormWrapper(setForm),
        signIn: signInWrapper(setForm, setLoading),
    }
}

function onChangeStateWrapper(setForm: StateSetter<LoginForm>) {
    return function onChange(name: keyof LoginForm) {
        return function (value: string) {
            setForm((f) => ({ ...f, [name]: { ...f[name], value } }))
        }
    }
}

function onBlurWrapper(setForm: StateSetter<LoginForm>) {
    return function onBlur(name: keyof LoginForm) {
        setForm((f) => {
            const formCopy = { ...f }

            const value = f[name].value

            const validator = validatorMap[name]

            const res = validator.safeParse(value)

            if (!res.success) {
                const errorMessage = res.error.issues[0].message
                formCopy[name] = { ...f[name], error: errorMessage }
            } else {
                formCopy[name] = { ...f[name], error: '' }
            }

            return formCopy
        })
    }
}

function clearFormErrors(setForm: StateSetter<LoginForm>) {
    return function () {
        setForm((f) => ({
            ...f,
            email: { ...f.email, error: '' },
            password: { ...f.password, error: '' },
        }))
    }
}

function validateFormWrapper(setForm: StateSetter<LoginForm>) {
    return function (toast: ReturnType<typeof useToast>) {
        setForm((form) => {
            async function asyncE() {
                const schemaResponse = await formSchema.safeParseAsync({
                    email: form.email.value,
                    password: form.password.value,
                })

                if (!schemaResponse.success) {
                    const errorMessage = schemaResponse.error.issues[0].message

                    toast.show({
                        placement: 'top',
                        render: () => <Toast errorMessage={errorMessage} />,
                    })

                    return false
                }
            }

            asyncE()
            return form
        })

        return true
    }
}

function signInWrapper(
    setForm: StateSetter<LoginForm>,
    setLoading: StateSetter<boolean>,
) {
    return function (navigation: any, toast: any) {
        setForm((form) => {
            async function asyncE() {
                try {
                    setLoading(true)
                    await signInWithEmailAndPassword(
                        auth,
                        form.email.value,
                        form.password.value,
                    )

                    navigation.navigate('Home')
                } catch (error: any) {
                    let errorMessage = error.message as string

                    if (errorMessage.includes('user-not-found')) {
                        errorMessage = `User does not exist`
                    }

                    toast.show({
                        placement: 'top',
                        render: () => <Toast errorMessage={errorMessage} />,
                    })
                }
                setLoading(false)
            }

            asyncE()
            return form
        })
    }
}

export function Login(props: any) {
    const [form, setForm] = useState<LoginForm>({
        email: { value: '', error: '' },
        password: { value: '', error: '' },
    })

    const [loading, setLoading] = useState(false)

    const toast = useToast()

    const { onChange, onBlur, clearFormErrors, validateForm, signIn } =
        localActions(setForm, setLoading)

    async function login() {
        Keyboard.dismiss()

        clearFormErrors()

        const formIsValid = validateForm(toast)

        if (!formIsValid) return

        signIn(props.navigation, toast)
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
                </VStack>
            </Center>
        </Layout>
    )
}
