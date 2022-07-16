import { signInWithEmailAndPassword } from 'firebase/auth'
import { Center, HStack, Input, Link, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { Logo } from '../components/Logo'
import { RDButton } from '../components/RDButton'
import { auth } from '../configs/firebase.config'

interface LoginForm {
    email: string
    password: string
}

export function Login(props: any) {
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' })

    function onChange(name: string) {
        return function (value: string) {
            setForm((f) => ({ ...f, [name]: value }))
        }
    }

    async function login() {
        try {
            const userCred = await signInWithEmailAndPassword(
                auth,
                form.email,
                form.password,
            )

            console.log('login: ', userCred.user.uid)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <Center h='full' w='full'>
                <VStack w='full' alignItems='center' px={5}>
                    <HStack w='full' justifyContent='center'>
                        <Logo />
                        <Text fontSize='3xl'>RiDiet</Text>
                    </HStack>

                    <Text fontSize='2xl'>Login</Text>

                    <Input
                        my={2}
                        placeholder='Email'
                        fontSize='xl'
                        onChangeText={onChange('email')}
                        value={form.email}
                    />

                    <Input
                        my={2}
                        placeholder='Password'
                        fontSize='xl'
                        onChangeText={onChange('password')}
                        value={form.password}
                        secureTextEntry
                    />

                    <RDButton
                        w='full'
                        title='Login'
                        mt='3'
                        onPress={async () => {
                            await login()

                            props.navigation.navigate('Home')
                        }}
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
