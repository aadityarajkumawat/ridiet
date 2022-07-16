import { Box, HStack, Text } from 'native-base'
import { Layout } from '../components/Layout'
import { Logo } from '../components/Logo'
import { RDButton } from '../components/RDButton'
import { useWindowDimensions, Image } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../configs/firebase.config'
import { useEffect, useState } from 'react'

const images = [
    require('../assets/ss1.png'),
    require('../assets/ss2.png'),
    require('../assets/ss3.png'),
]

export function StartScreen(props: any) {
    const { height } = useWindowDimensions()

    const [local, setLocal] = useState({ displayImage: 0 })

    useEffect(() => {
        setInterval(() => {
            setLocal((l) => {
                let v = l.displayImage
                if (l.displayImage === 2) {
                    v = 0
                } else {
                    v++
                }
                return {
                    displayImage: v,
                }
            })
        }, 2000)
    }, [])

    onAuthStateChanged(auth, function (user) {
        if (!user) {
            console.log('not logged in!')
            return
        }

        console.log('logged in')
    })

    return (
        <Layout px={3}>
            <HStack w='full' my={5} justifyContent='center'>
                <Logo />
                <Text fontSize='3xl'>RiDiet</Text>
            </HStack>
            <Box
                w='full'
                h={height - 250}
                backgroundColor='grey4'
                borderRadius='md'
            >
                <Image
                    source={images[local.displayImage]}
                    style={{ width: '100%', height: '100%' }}
                />
                <Box
                    position='absolute'
                    bottom={0}
                    bgColor='#00000070'
                    w='100%'
                    px={3}
                    py={4}
                    color='#fff'
                    borderRadius={'md'}
                >
                    <Text
                        color='#fff'
                        textDecorationLine={'underline'}
                        fontSize={'lg'}
                        fontWeight='bold'
                    >
                        Cool title, have a healthy diet
                    </Text>
                    <Text color='#fff'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel sint repudiandae, cumque asperiores praesentium
                        nulla officiis iure laboriosam obcaecati dolore eligendi
                        consectetur perspiciatis.
                    </Text>
                </Box>
            </Box>
            <HStack justifyContent='center' mt={3}>
                <Box
                    w={3}
                    h={3}
                    bgColor={local.displayImage === 0 ? 'purple2' : 'purple3'}
                    borderRadius='full'
                ></Box>
                <Box
                    w={3}
                    h={3}
                    bgColor={local.displayImage === 1 ? 'purple2' : 'purple3'}
                    mx={3}
                    borderRadius='full'
                ></Box>
                <Box
                    w={3}
                    h={3}
                    borderRadius='full'
                    bgColor={local.displayImage === 2 ? 'purple2' : 'purple3'}
                ></Box>
            </HStack>
            <RDButton
                w='full'
                mt={3}
                position='absolute'
                bottom={5}
                title='Start a healthy routine'
                onPress={() => props.navigation.navigate('Login')}
            />
        </Layout>
    )
}
