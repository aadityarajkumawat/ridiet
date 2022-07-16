import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Flex, Text } from 'native-base'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { RDButton } from '../components/RDButton'
import { SelectButton } from '../components/SelectButton'
import { RootStackParamList } from '../constants/types'

export function SelectDiet(props: NativeStackScreenProps<RootStackParamList>) {
    const [diseases, setDiseases] = useState([
        { name: 'Vegan', selected: false },
        { name: 'Vegeterian', selected: false },
        { name: 'Eggeterian', selected: false },
        { name: 'Non-Vegeterian', selected: false },
    ])

    return (
        <Layout mx={3} my={3}>
            <Text fontSize='2xl'>Select Diet</Text>

            <Flex>
                {diseases.map((dis, idx) => (
                    <SelectButton
                        {...dis}
                        onPress={() => {
                            setDiseases((dis) => {
                                const cp = [...dis]

                                cp[idx].selected = true

                                for (let i = 0; i < diseases.length; i++) {
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
                onPress={() => props.navigation.navigate('Home')}
            />
        </Layout>
    )
}
