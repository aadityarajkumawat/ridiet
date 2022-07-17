import { Box, Button, HStack, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

export function SelectButton(props: any) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Box
                px={3}
                py={2}
                bgColor={props.selected ? 'purple1' : 'purple3'}
                mr={2}
                mt={3}
                borderRadius={3}
                w='full'
            >
                <Text color='white' fontSize='lg'>
                    {props.name}
                </Text>
            </Box>

            {props.types.length > 0 && props.selected && (
                <HStack mt={2}>
                    {props.types.map((t: string, i: number) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => props.onAddType(t)}
                            style={{
                                backgroundColor: props.selectedTypes.includes(t)
                                    ? 'purple3'
                                    : 'white',
                                marginRight: 4,
                            }}
                        >
                            <Text
                                borderRadius={3}
                                px={5}
                                py={2}
                                borderColor='purple1'
                                borderWidth={2}
                                color='purple1'
                            >
                                {t}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </HStack>
            )}
        </TouchableOpacity>
    )
}
