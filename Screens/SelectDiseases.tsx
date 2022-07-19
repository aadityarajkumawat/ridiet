import { collection, getDocs } from 'firebase/firestore'
import { Text, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { RDButton } from '../components/RDButton'
import { RDLoading } from '../components/RDLoading'
import { SelectButton } from '../components/SelectButton'
import { db } from '../configs/firebase.config'
import { Disease, FirebaseDisease } from '../constants/types'
import { useStore } from '../zustand/store'

interface LocalState {
    diseases: Array<Disease>
    loadingDiseases: boolean
}

async function loadDiseases() {
    const diseasesCollection = collection(db, 'diseases')
    const result = await getDocs(diseasesCollection)
    const diseases = result.docs.map((d) => ({
        ...(d.data() as FirebaseDisease),
        selected: false,
        selectedTypes: [],
    }))

    return diseases
}

export function SelectDiseases(props: any) {
    const [local, setLocal] = useState<LocalState>({
        diseases: [],
        loadingDiseases: true,
    })

    const { updateDisease } = useStore((s) => ({
        updateDisease: s.updateOnBoardingDiseases,
    }))

    useEffect(() => {
        async function asyncE() {
            setLocal((l) => ({ ...l, loadingDiseases: true }))
            const diseases = await loadDiseases()
            setLocal((ls) => ({ ...ls, diseases, loadingDiseases: false }))
        }

        asyncE()
    }, [])

    if (local.loadingDiseases) {
        return <RDLoading />
    }

    return (
        <Layout>
            <Text fontSize='2xl'>Select Diseases</Text>

            <VStack w='full'>
                {local.diseases.map((dis, i) => (
                    <SelectButton
                        {...dis}
                        key={i}
                        onAddType={(type: string) => {
                            setLocal((l) => {
                                const cpL = { ...l }

                                const alreadyHasType =
                                    cpL.diseases[i].selectedTypes.includes(type)
                                if (alreadyHasType) {
                                    cpL.diseases[i].selectedTypes =
                                        cpL.diseases[i].selectedTypes.filter(
                                            (st) => st !== type,
                                        )

                                    return cpL
                                }

                                cpL.diseases[i].selectedTypes.push(type)

                                return cpL
                            })
                        }}
                        onPress={() => {
                            setLocal((dis) => {
                                const cpDis = { ...dis }
                                const cp = [...cpDis.diseases]

                                cp[i].selected = !cp[i].selected

                                return cpDis
                            })
                        }}
                    />
                ))}
            </VStack>

            <RDButton
                title='Next >>'
                position={'absolute'}
                bottom={7}
                w={'full'}
                onPress={() => {
                    const selectedDiseases: Array<
                        Omit<Disease, 'selected' | 'types'>
                    > = []

                    for (let dise of local.diseases) {
                        const { selected, types, ...dis } = dise
                        if (dise.selected) {
                            if (dise.types.length > 0) {
                                if (dis.selectedTypes.length !== 0) {
                                    selectedDiseases.push(dis)
                                }
                            } else {
                                selectedDiseases.push(dis)
                            }
                        }
                    }

                    updateDisease(selectedDiseases)
                    props.navigation.navigate('SelectDiet')
                }}
            />
        </Layout>
    )
}
