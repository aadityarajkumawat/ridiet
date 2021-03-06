import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Theme, useToast } from 'native-base'
import React, { SetStateAction } from 'react'
import { themeConfig } from '../configs/styleConfig'

export type RootStackParamList = {
    StartScreen: undefined
    Login: undefined
    Register: undefined
    Home: undefined
    SelectDiseases: undefined
    SelectAllergy: undefined
    SelectDiet: undefined
}

export enum ButtonType {
    Primary,
    Secondary,
}

type BaseColors = keyof Theme['colors']
export type RDColor = keyof typeof themeConfig['colors'] | BaseColors

export type Gender = 'M' | 'F' | 'O'

export interface FirebaseDisease {
    diseaseId: string
    name: string
    types: Array<string>
}

export interface Disease extends FirebaseDisease {
    selected: boolean
    selectedTypes: Array<string>
}

export type Field = { value: string; error: string }

export interface LoginForm {
    email: Field
    password: Field
}

export type StateSetter<T> = React.Dispatch<SetStateAction<T>>
export type StateType<T> = [T, StateSetter<T>]
export type ScreenProps = NativeStackScreenProps<RootStackParamList>
export type NavigateFn = ScreenProps['navigation']['navigate']
export type ToastConf = ReturnType<typeof useToast>

export type ResolveValues<T> = {
    [K in keyof T]: string
}
