import { __IS_PROD__ } from '../constants/values'

export function devlog(...things: Parameters<typeof console.log>) {
    if (__IS_PROD__) return
    console.log(...things)
}
