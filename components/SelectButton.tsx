import { Box, Button, HStack, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { themeConfig } from '../configs/styleConfig'

interface SelectButtonProps {
    name: string
    selected: string
    selectedTypes?: Array<string>
    types?: Array<string>
    onAddType?: (type: string) => void
    onPress: () => void
}

export function SelectButton(props: SelectButtonProps) {
    const isSelected = (type: string) =>
        props.selectedTypes && props.selectedTypes.includes(type)

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

            {props.types &&
                props.onAddType &&
                props.types.length > 0 &&
                props.selected && (
                    <HStack mt={2}>
                        {props.types.map((t, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => props.onAddType(t)}
                                style={{
                                    backgroundColor: isSelected(t)
                                        ? themeConfig.colors.purple3
                                        : 'white',
                                    marginRight: 4,
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    borderRadius={3}
                                    px={5}
                                    py={2}
                                    borderColor='purple1'
                                    borderWidth={2}
                                    color={
                                        isSelected(t)
                                            ? 'white'
                                            : themeConfig.colors.purple3
                                    }
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
