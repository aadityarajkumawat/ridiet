import { Box, Button, HStack, Text } from 'native-base'
import { themeConfig } from '../configs/styleConfig'
import { RDText } from './RDText'

interface SelectButtonProps {
    name: string
    selected: boolean
    selectedTypes?: Array<string>
    types?: Array<string>
    onPress?: () => void
    onAddType?: (type: string) => void
}

interface DiseaseTypeButtonProps {
    onAddType: (type: string) => void
    isSelected: (type: string) => boolean
    t: string
}

function DiseaseTypeButton(props: DiseaseTypeButtonProps) {
    const { isSelected, onAddType, t } = props
    return (
        <Button
            onPress={() => onAddType(t)}
            style={{
                backgroundColor: isSelected(t)
                    ? themeConfig.colors.purple3
                    : 'white',
                marginRight: 4,
                borderRadius: 5,
            }}
        >
            <RDText
                borderRadius={3}
                px={5}
                py={2}
                borderColor='purple1'
                borderWidth={2}
                color={isSelected(t) ? 'white' : themeConfig.colors.purple3}
            >
                {t}
            </RDText>
        </Button>
    )
}

export function SelectButton(props: SelectButtonProps) {
    const isSelected = (type: string) =>
        props.selectedTypes && props.selectedTypes.includes(type)

    const checkIfTypesAvailable = () => {
        return (
            !!props.onAddType &&
            !!props.onPress &&
            !!props.selectedTypes &&
            !!props.types &&
            !!props.selected
        )
    }

    const { name, selected } = props

    return (
        <>
            <Button onPress={props.onPress}>
                <Box
                    px={3}
                    py={2}
                    bgColor={selected ? 'purple1' : 'purple3'}
                    mr={2}
                    mt={3}
                    borderRadius={3}
                    w='full'
                >
                    <RDText color='white' fontSize='lg'>
                        {name}
                    </RDText>
                </Box>
            </Button>

            {checkIfTypesAvailable() && (
                <HStack mt={2}>
                    {props.types!.map((t, i) => (
                        <DiseaseTypeButton
                            isSelected={isSelected as any}
                            onAddType={props.onAddType as any}
                            key={i}
                            t={t}
                        />
                    ))}
                </HStack>
            )}
        </>
    )
}
