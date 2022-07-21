import { signInWithEmailAndPassword } from 'firebase/auth'
import { z } from 'zod'
import { Toast } from '../../components/Toast'
import { auth } from '../../configs/firebase.config'
import {
    LoginForm,
    NavigateFn,
    ResolveValues,
    StateSetter,
    ToastConf,
} from '../../constants/types'

const emailValidator = z.string().email({ message: 'Invalid email address' })

const passwordValidator = z
    .string()
    .min(8, { message: 'Password too short' })
    .max(20, { message: 'Password too long' })

const validatorMap = {
    email: emailValidator,
    password: passwordValidator,
}

const formSchema = z.object({
    email: emailValidator,
    password: passwordValidator,
})

export function localActions(
    setForm: StateSetter<LoginForm>,
    setLoading: StateSetter<boolean>,
) {
    return {
        onChange: onChangeStateWrapper(setForm),
        onBlur: onBlurWrapper(setForm),
        clearFormErrors: clearFormErrors(setForm),
        resolveValueObject: resolveValueObject,
        validateForm: validateFormWrapper(),
        signIn: signInWrapper(setForm, setLoading),
    }
}

function onChangeStateWrapper(setForm: StateSetter<LoginForm>) {
    return function onChange(name: keyof LoginForm) {
        return function (value: string) {
            setForm((f) => ({ ...f, [name]: { ...f[name], value } }))
        }
    }
}

function onBlurWrapper(setForm: StateSetter<LoginForm>) {
    return function onBlur(name: keyof LoginForm) {
        setForm((f) => {
            const formCopy = { ...f }

            const value = f[name].value

            const validator = validatorMap[name]

            const res = validator.safeParse(value)

            if (!res.success) {
                const errorMessage = res.error.issues[0].message
                formCopy[name] = { ...f[name], error: errorMessage }
            } else {
                formCopy[name] = { ...f[name], error: '' }
            }

            return formCopy
        })
    }
}

function clearFormErrors(setForm: StateSetter<LoginForm>) {
    return function () {
        setForm((f) => ({
            ...f,
            email: { ...f.email, error: '' },
            password: { ...f.password, error: '' },
        }))
    }
}

function validateFormWrapper() {
    return function (formValues: ResolveValues<LoginForm>, toast: ToastConf) {
        let formIsValid = true
        const schemaResponse = formSchema.safeParse(formValues)

        if (!schemaResponse.success) {
            const errorMessage = schemaResponse.error.issues[0].message

            toast.show({
                placement: 'top',
                render: () => <Toast errorMessage={errorMessage} />,
            })

            formIsValid = false
        }

        return formIsValid
    }
}

function signInWrapper(
    setForm: StateSetter<LoginForm>,
    setLoading: StateSetter<boolean>,
) {
    return function (navigate: NavigateFn, toast: ToastConf) {
        setForm((form) => {
            ;(async function () {
                try {
                    setLoading(true)
                    await signInWithEmailAndPassword(
                        auth,
                        form.email.value,
                        form.password.value,
                    )

                    navigate('Home')
                } catch (error: any) {
                    let errorMessage = error.message as string

                    if (errorMessage.includes('user-not-found')) {
                        errorMessage = `User does not exist`
                    }

                    toast.show({
                        placement: 'top',
                        render: () => <Toast errorMessage={errorMessage} />,
                    })
                }
                setLoading(false)
            })()
            return form
        })
    }
}

function resolveValueObject(state: LoginForm) {
    const valueObj: ResolveValues<LoginForm> = {
        email: '',
        password: '',
    }

    valueObj.email = state.email.value
    valueObj.password = state.password.value

    return valueObj
}
