import { Box, Text } from 'native-base'
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
            >
                <Text color='white' fontSize='lg'>
                    {props.name}
                </Text>
            </Box>
        </TouchableOpacity>
    )
}
