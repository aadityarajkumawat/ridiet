import { Text } from 'native-base'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'
import { ReactNode } from 'react'

export function RDText(props: { children: ReactNode } & InterfaceTextProps) {
    const { children, ...rest } = props
    return (
        <Text style={{ fontFamily: 'inter400R' }} {...rest}>
            {props.children}
        </Text>
    )
}
