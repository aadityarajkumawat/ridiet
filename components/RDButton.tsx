import { Button, IButtonProps, Text } from 'native-base'
import { ReactNode } from 'react'
import { ButtonType, RDColor } from '../constants/types'

interface RDButtonProps extends IButtonProps {
    title: string
    scheme?: ButtonType
    children?: ReactNode
}

function getBGColor(variant: ButtonType = ButtonType.Primary): RDColor {
    if (variant === ButtonType.Primary) return 'purple2'
    return 'purple4'
}

export function RDButton(props: RDButtonProps) {
    const { variant, ...buttonProps } = props

    return (
        <Button
            bgColor={getBGColor(props.scheme)}
            borderWidth={2}
            borderColor='purple1'
            {...buttonProps}
        >
            <Text fontSize='lg' fontWeight='medium' color='grey6'>
                {props.title}
            </Text>
        </Button>
    )
}
