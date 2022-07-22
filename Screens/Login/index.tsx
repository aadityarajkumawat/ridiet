import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Center, HStack, Link, Text, useToast, VStack } from 'native-base'
import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import { WebView } from 'react-native-webview'
import { Layout } from '../../components/Layout'
import { Logo } from '../../components/Logo'
import { RDButton } from '../../components/RDButton'
import { RDInput } from '../../components/RDInput'
import { RDText } from '../../components/RDText'
import { LoginForm, RootStackParamList } from '../../constants/types'
import { localActions } from './loginHelpers'

const A = WebView as any

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

    return <A source={{ uri: 'http://localhost:3000' }} />
}
