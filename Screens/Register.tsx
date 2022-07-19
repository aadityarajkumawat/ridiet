import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
    Box,
    Center,
    CheckIcon,
    HStack,
    Input,
    Link,
    Select,
    Text,
    VStack,
} from 'native-base'
import React, { useState } from 'react'
import { useStore } from '../zustand/store'
import { Layout } from '../components/Layout'
import { Logo } from '../components/Logo'
import { RDButton } from '../components/RDButton'
import { auth } from '../configs/firebase.config'
import { Gender } from '../constants/types'
import { StoreState } from '../zustand/store'

const initialState = {
    form: {
        name: '',
        email: '',
        password: '',
        mobile: '',
        age: 0,
        gender: 'M' as Gender,
    },
}

type LocalState = typeof initialState
type FieldName = keyof LocalState['form']

const numericFormFields: Array<FieldName> = ['age']

export function Register(props: any) {
    const [local, setLocal] = useState<LocalState>({ ...initialState })

    const { updateProfile, data } = useStore((s) => ({
        updateProfile: s.updateOnBoardingProfile,
        data: s.onBoardingData,
    }))

    function onChange(name: FieldName) {
        return function (value: string) {
            let normalizedValue: string | number = value

            if (numericFormFields.includes(name)) {
                normalizedValue = parseFloat(value)
            }

            setLocal((f) => ({
                ...f,
                form: { ...f.form, [name]: normalizedValue },
            }))
        }
    }

    async function registerUser() {
        try {
            const { password, ...profile } = local.form

            const userCred = await createUserWithEmailAndPassword(
                auth,
                local.form.email,
                local.form.password,
            )

            const userId = userCred.user.uid

            // save the details in local state
            updateProfile({ userId, ...profile })
        } catch (error: any) {
            const { code, message } = error
            console.log({ code, message })
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

                    <Text fontSize='2xl'>Register</Text>

                    <Input
                        my={2}
                        placeholder='Name'
                        fontSize='xl'
                        onChangeText={onChange('name')}
                        value={local.form.name}
                    />
                    <Input
                        my={2}
                        placeholder='Email'
                        fontSize='xl'
                        onChangeText={onChange('email')}
                        value={local.form.email}
                        keyboardType='email-address'
                    />
                    <Input
                        my={2}
                        placeholder='Password'
                        fontSize='xl'
                        onChangeText={onChange('password')}
                        value={local.form.password}
                        type='password'
                        secureTextEntry
                    />
                    <Input
                        my={2}
                        placeholder='Mobile'
                        fontSize='xl'
                        onChangeText={onChange('mobile')}
                        value={local.form.mobile}
                        keyboardType='numeric'
                    />
                    <Input
                        my={2}
                        placeholder='Age'
                        fontSize='xl'
                        onChangeText={onChange('age')}
                        value={local.form.age ? local.form.age.toString() : ''}
                        keyboardType='numeric'
                    />

                    <Box w={'full'}>
                        <Select
                            minWidth='200'
                            accessibilityLabel='Gender'
                            placeholder='Gender'
                            _selectedItem={{
                                bg: 'teal.600',
                                endIcon: <CheckIcon size='5' />,
                            }}
                            mt={1}
                            fontSize='xl'
                            onValueChange={onChange('gender')}
                        >
                            <Select.Item label='Male' value='M' />
                            <Select.Item label='Female' value='F' />
                            <Select.Item label='Others' value='O' />
                        </Select>
                    </Box>

                    <RDButton
                        w='full'
                        title='Register'
                        mt={3}
                        onPress={async () => {
                            await registerUser()
                            props.navigation.navigate('SelectDiseases')
                        }}
                    />
                    <HStack space={2} mt={2}>
                        <Text fontSize={16} color={'grey2'}>
                            Already have an account?
                        </Text>
                        <Link
                            onPress={() => props.navigation.navigate('Login')}
                        >
                            <Text fontSize={16} color={'blue1'}>
                                Login
                            </Text>
                        </Link>
                    </HStack>
                </VStack>
            </Center>
        </Layout>
    )
}
