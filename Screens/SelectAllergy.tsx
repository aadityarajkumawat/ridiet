import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Flex, Text } from 'native-base'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { RDButton } from '../components/RDButton'
import { SelectButton } from '../components/SelectButton'
import { RootStackParamList } from '../constants/types'

export function SelectAllergy(
    props: NativeStackScreenProps<RootStackParamList>,
) {
    const [diseases, setDiseases] = useState([
        { name: 'Lactose', selected: false },
        { name: 'Dust', selected: false },
        { name: 'Fruit', selected: false },
        { name: 'Vegatable', selected: false },
        { name: 'Skin', selected: false },
        { name: 'Drug Allergy', selected: false },
        { name: 'Mold', selected: false },
    ])

    return (
        <Layout mx={3} my={3}>
            <Text fontSize='2xl'>Select Allergy</Text>

            <Flex flexWrap={'wrap'} flexDir={'row'}>
                {diseases.map((dis, i) => (
                    <SelectButton
                        {...dis}
                        onPress={() => {
                            setDiseases((dis) => {
                                const cp = [...dis]

                                cp[i].selected = !cp[i].selected

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
                onPress={() => props.navigation.navigate('SelectDiet')}
            />
        </Layout>
    )
}
