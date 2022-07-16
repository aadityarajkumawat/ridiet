import { Image } from 'native-base'

const logo = require('../assets/logo.png')

export function Logo() {
    return <Image source={logo} alt='logo' />
}
