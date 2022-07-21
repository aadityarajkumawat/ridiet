import create from 'zustand'
import { Disease } from '../constants/types'

export interface StoreState {
    onBoardingData: OnBoardingData
    updateOnBoardingProfile: (update: OnBoardingData['profile']) => void
    updateOnBoardingDiseases: (update: OnBoardingData['diseases']) => void
    updateOnBoardingDiet: (update: OnBoardingData['diet']) => void
}

interface OnBoardingData {
    profile: Profile
    diseases: Array<Omit<Disease, 'selected' | 'types'>>
    diet: string
}

interface Profile {
    userId: string
    name: string
    email: string
    mobile: string
    age: number
    gender: string
}

const useStore = create<StoreState>((set) => ({
    onBoardingData: {
        profile: {
            userId: '',
            name: '',
            email: '',
            mobile: '',
            age: 0,
            gender: '',
        },
        diseases: [],
        diet: '',
    },
    updateOnBoardingProfile: (update) =>
        set((state) => ({
            ...state,
            onBoardingData: {
                ...state.onBoardingData,
                profile: { ...state.onBoardingData.profile, ...update },
            },
        })),
    updateOnBoardingDiseases: (update) =>
        set((state) => ({
            ...state,
            onBoardingData: {
                ...state.onBoardingData,
                diseases: [...state.onBoardingData.diseases, ...update],
            },
        })),
    updateOnBoardingDiet: (update) =>
        set((state) => ({
            ...state,
            onBoardingData: {
                ...state.onBoardingData,
                diet: update,
            },
        })),
}))

export { useStore }
