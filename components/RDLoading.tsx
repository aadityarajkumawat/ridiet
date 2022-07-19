import { Center, Spinner, Text, VStack } from 'native-base'
import React from 'react'

export function RDLoading() {
    return (
        <Center w='100%' h='100%'>
            <VStack>
                <Spinner color='purple2' size='lg' />
                <Text>Loading...</Text>
            </VStack>
        </Center>
    )
}
