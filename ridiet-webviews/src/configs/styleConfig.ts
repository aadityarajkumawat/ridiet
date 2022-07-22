import { extendTheme } from 'native-base'

export const themeConfig = {
    // fonts: {
    //     body: 'inter',
    // },
    // fontConfig: {
    //     inter: {
    //         400: {
    //             normal: 'inter400R',
    //         },
    //     },
    // },
    colors: {
        blue1: '#0075FF',
        blue2: '#3994FF',
        blue3: '#8DC1FF',
        blue4: '#BBDAFF',

        grey1: '#2E2E2E',
        grey2: '#5B5B5B',
        grey3: '#838383',
        grey4: '#BFBFBF',
        grey5: '#E0E0E0',
        grey6: '#F4F4F4',

        orange1: '#FFA800',
        orange2: '#FFC554',
        orange3: '#FFD583',
        orange4: '#FFE2B6',

        pink1: '#FF54E4',
        pink2: '#FF85EC',
        pink3: '#FFC4F6',
        pink4: '#FFF1FD',

        purple1: '#714DFF',
        purple2: '#957BFF',
        purple3: '#C5B6FF',
        purple4: '#EAE5FF',
    },
}

const theme = extendTheme(themeConfig)

export { theme }
