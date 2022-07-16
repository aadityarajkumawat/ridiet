import { Flex, Text } from 'native-base'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { RDButton } from '../components/RDButton'
import { SelectButton } from '../components/SelectButton'

export function SelectDiseases(props: any) {
    const [diseases, setDiseases] = useState([
        { name: 'Diabetes', selected: false },
        { name: 'Artheritis', selected: false },
        { name: 'Blood Pressure', selected: false },
        { name: 'Cancer', selected: false },
        { name: 'Blood Pressure', selected: false },
        { name: 'Cancer', selected: false },
        { name: 'Artheritis', selected: false },
        { name: 'Diabetes', selected: false },
        { name: 'Artheritis', selected: false },
        { name: 'Blood Pressure', selected: false },
        { name: 'Blood Pressure', selected: false },
        { name: 'Cancer', selected: false },
        { name: 'Blood Pressure', selected: false },
    ])

    return (
        <Layout mx={3} my={3}>
            <Text fontSize='2xl'>Select Diseases</Text>

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
                onPress={() => props.navigation.navigate('SelectAllergy')}
            />
        </Layout>
    )
}
