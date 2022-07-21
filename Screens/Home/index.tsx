import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { Box, Center, HStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Layout } from '../../components/Layout'
import { Logo } from '../../components/Logo'
import { RDButton } from '../../components/RDButton'
import { RDText } from '../../components/RDText'
import { auth, db } from '../../configs/firebase.config'
import { RootStackParamList } from '../../constants/types'
import { v4 } from 'uuid'

const image =
    'https://lh3.googleusercontent.com/a-/AFdZucoRWplJR6Icb8ssR43H7DDHhSMpiHFf4fW4LUrCJQ=s96-c-rg-br100'

interface Disease {
    diseaseId: string
    name: string
    selectedTypes: Array<string>
}

interface LocalState {
    diseases: Array<Disease>
}

export function Home(props: NativeStackScreenProps<RootStackParamList>) {
    const [local, setLocal] = useState<LocalState>({ diseases: [] })

    useEffect(() => {
        ;(async () => {
            const auth = getAuth()
            const user = auth.currentUser

            if (!user) return

            const userId = user.uid

            const userDoc = doc(db, 'users', userId)

            const userDetails = await getDoc(userDoc)
            const userDetailsData = userDetails.data()

            if (!userDetailsData) return

            if (userDetails) {
                setLocal((l) => ({
                    ...l,
                    diseases: userDetailsData.diseases,
                }))
            }
        })()
    }, [])

    function getTypesString(disease: Disease) {
        return disease.selectedTypes.join(', ')
    }

    // auth.signOut()

    return (
        <Layout>
            <HStack w='full' justifyContent='space-between' alignItems='center'>
                <HStack alignItems='center'>
                    <Logo />
                    <RDText fontSize='lg'>RiDiet</RDText>
                </HStack>
                <Box w='60px' h='60px'>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: image }}
                    />
                </Box>
            </HStack>

            <Box
                w='full'
                px={5}
                py={6}
                mt={10}
                bgColor='orange4'
                borderRadius='md'
                borderWidth={2}
                borderColor='orange1'
                shadow='4'
            >
                <HStack w='full' justifyContent='space-between'>
                    <Box>
                        <RDText
                            color='purple1'
                            fontWeight='bold'
                            fontSize='lg'
                            textDecorationLine='underline'
                        >
                            Diseases
                        </RDText>
                        {local.diseases.map((disease) => (
                            <RDText key={v4()} color='purple1'>
                                {disease.name}: {getTypesString(disease)}
                            </RDText>
                        ))}
                    </Box>

                    <Center
                        w={140}
                        h={140}
                        bgColor='blue4'
                        borderRadius='full'
                        borderWidth={2}
                        borderColor='blue1'
                        shadow='7'
                    >
                        <RDText fontWeight='bold' fontSize='xl' color='blue2'>
                            03/15
                        </RDText>
                    </Center>
                </HStack>
            </Box>

            <HStack w='full' justifyContent='space-between'>
                <Center
                    w='49%'
                    px={2}
                    py={6}
                    mt={10}
                    bgColor='blue4'
                    borderRadius='md'
                    borderWidth={2}
                    borderColor='blue1'
                    shadow='4'
                >
                    <RDText fontWeight='bold' fontSize='md' color='blue2'>
                        User Consumption
                    </RDText>
                </Center>
                <Center
                    w='49%'
                    px={2}
                    py={6}
                    mt={10}
                    bgColor='purple4'
                    borderRadius='md'
                    borderWidth={2}
                    borderColor='purple1'
                    shadow='4'
                >
                    <RDText fontWeight='bold' fontSize='md' color='purple1'>
                        Today's Meals
                    </RDText>
                </Center>
            </HStack>

            <Center
                w='full'
                px={5}
                py={6}
                mt={10}
                bgColor='pink4'
                borderRadius='md'
                borderWidth={2}
                borderColor='pink2'
                shadow='4'
            >
                <RDText fontWeight='bold' fontSize='md' color='pink1'>
                    Water Intake: 600 ml/ 4 ltr
                </RDText>
            </Center>

            <RDButton
                w='full'
                mt={3}
                position='absolute'
                bottom={5}
                title='Check your progress'
            />
        </Layout>
    )
}
