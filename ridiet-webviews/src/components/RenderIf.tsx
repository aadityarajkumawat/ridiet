import { ReactNode } from 'react'

export function RenderIf(props: { children: ReactNode; if: boolean }) {
    if (!props.if) return null
    return props.children as JSX.Element
}
