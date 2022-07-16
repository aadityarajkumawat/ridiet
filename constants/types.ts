import { Theme } from 'native-base'
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
