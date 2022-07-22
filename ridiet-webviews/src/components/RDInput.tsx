import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    IInputProps,
    Input,
    Text,
    WarningOutlineIcon,
} from 'native-base'
import { useState } from 'react'

type ExtraInputProps = {
    error?: string
}

function ShowPasswordButton(props: { toggle: () => void }) {
    return (
        <Button
            onPress={props.toggle}
            style={{ backgroundColor: '#eee', height: '100%' }}
        >
            <Text mx={2} mt={2}>
                show
            </Text>
        </Button>
    )
}

export function RDInput(props: ExtraInputProps & IInputProps) {
    // for password toggle
    const [shown, setShown] = useState(true)

    let { error, ...inputProps } = props
    if (!error) error = ''

    return (
        <>
            <FormControl isInvalid={error !== ''}>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
                    {error}
                </FormControl.ErrorMessage>
                <Input
                    style={{ fontFamily: 'inter400R' }}
                    w='full'
                    my={2}
                    fontSize='xl'
                    InputRightElement={
                        props.type === 'password' ? (
                            <ShowPasswordButton
                                toggle={() => setShown((b) => !b)}
                            />
                        ) : undefined
                    }
                    secureTextEntry={props.type === 'password' ? shown : false}
                    {...inputProps}
                />
            </FormControl>
        </>
    )
}
