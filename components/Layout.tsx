import { Box, IBoxProps, StatusBar } from 'native-base'
import { ReactNode } from 'react'

interface LayoutProps extends IBoxProps {
    children: ReactNode
}

export function Layout(props: LayoutProps) {
    const boxProps = { ...props }
    delete boxProps['children']

    return (
        <Box
            {...boxProps}
            position='relative'
            h='full'
            bgColor='#fff'
            alignItems='center'
        >
            <StatusBar barStyle='default' />
            {props.children}
        </Box>
    )
}
