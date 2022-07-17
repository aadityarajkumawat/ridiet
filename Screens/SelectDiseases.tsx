import { collection, getDocs } from 'firebase/firestore'
import { Flex, Text, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { RDButton } from '../components/RDButton'
import { SelectButton } from '../components/SelectButton'
import { db } from '../configs/firebase.config'

interface FirebaseDisease {
    diseaseId: string
    name: string
    types: Array<string>
}

interface Disease extends FirebaseDisease {
    selected: boolean
    showTypes: boolean
    selectedTypes: Array<string>
}

interface LocalState {
    diseases: Array<Disease>
}

export function SelectDiseases(props: any) {
    const [local, setLocal] = useState<LocalState>({
        diseases: [],
    })

    async function loadDiseases() {
        const diseasesCollection = collection(db, 'diseases')
        const result = await getDocs(diseasesCollection)
        const diseases = result.docs.map((d) => ({
            ...(d.data() as FirebaseDisease),
            selected: false,
            showTypes: false,
            selectedTypes: [],
        }))

        setLocal((ls) => ({ ...ls, diseases }))
    }

    useEffect(() => {
        loadDiseases()
    }, [])

    return (
        <Layout mx={3} my={3}>
            <Text fontSize='2xl'>Select Diseases</Text>

            <VStack w='full'>
                {local.diseases.map((dis, i) => (
                    <SelectButton
                        {...dis}
                        key={i}
                        onAddType={(type: string) => {
                            setLocal((l) => {
                                const cpL = { ...l }

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
                onPress={() => props.navigation.navigate('SelectAllergy')}
            />
        </Layout>
    )
}
