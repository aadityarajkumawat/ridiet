import { Box } from 'native-base'
import { RDText } from './RDText'

interface ToastProps {
    errorMessage: string
}

export function Toast(props: ToastProps) {
    return (
        <Box
            bgColor='red.100'
            px={2}
            py={2}
            borderRadius='md'
            borderWidth={1}
            borderColor='red.700'
        >
            <RDText color='red.700' fontWeight='bold'>
                {props.errorMessage}
            </RDText>
        </Box>
    )
}
