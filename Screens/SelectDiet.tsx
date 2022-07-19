import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { addDoc, collection } from 'firebase/firestore'
import { Flex, Text } from 'native-base'
import { useEffect, useRef, useState } from 'react'
import { Layout } from '../components/Layout'
import { RDButton } from '../components/RDButton'
import { RDLoading } from '../components/RDLoading'
import { SelectButton } from '../components/SelectButton'
import { db } from '../configs/firebase.config'
import { RootStackParamList } from '../constants/types'
import { StoreState, useStore } from '../zustand/store'

interface DietStateProps {
    loading: boolean
}

export function SelectDiet(props: NativeStackScreenProps<RootStackParamList>) {
    const [diet, setDiet] = useState([
        { name: 'Vegan', selected: false },
        { name: 'Vegeterian', selected: false },
        { name: 'Eggeterian', selected: false },
        { name: 'Non-Vegeterian', selected: false },
    ])

    const [local, setLocal] = useState<DietStateProps>({ loading: false })

    const scratchRef = useRef(useStore.getState().onBoardingData)

    function listener(state: StoreState) {
        return (scratchRef.current = state.onBoardingData)
    }

    useEffect(() => useStore.subscribe(listener), [])

    const { updateDiet } = useStore((s) => ({
        updateDiet: s.updateOnBoardingDiet,
    }))

    if (local.loading) {
        return <RDLoading />
    }

    return (
        <Layout>
            <Text fontSize='2xl'>Select Diet</Text>

            <Flex w='full'>
                {diet.map((dis, idx) => (
                    <SelectButton
                        key={idx}
                        {...dis}
                        onPress={() => {
                            setDiet((dis) => {
                                const cp = [...dis]

                                cp[idx].selected = !cp[idx].selected

                                for (let i = 0; i < diet.length; i++) {
                                    if (i !== idx) cp[i].selected = false
                                }

                                return cp
                            })
                        }}
                    />
                ))}
            </Flex>

            <RDButton
                title='Next >>'
                position={'absolute'}
                bottom={7}
                w={'full'}
                onPress={() => {
                    const [selectedDiet] = diet.filter((d) => d.selected)
                    updateDiet(selectedDiet.name)

                    async function saveData() {
                        setLocal((l) => ({ ...l, loading: true }))
                        const usersRef = collection(db, 'users')
                        await addDoc(usersRef, scratchRef.current)
                        setLocal((l) => ({ ...l, loading: false }))
                    }

                    saveData()

                    props.navigation.navigate('Home')
                }}
            />
        </Layout>
    )
}
