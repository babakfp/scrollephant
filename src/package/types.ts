export type Props = {
    movement: "scroll" | "fade"
    direction: "vertical" | "horizontal"
    loopUp: boolean
    loopDown: boolean
    restrictMovement: boolean
    scrollableSubsections: boolean
}

export type Section = {
    id: string
    ref: HTMLElement
    label?: string
    autoHeight: boolean
    subsections: Subsections
    translateY: number
    translateX: number
    isCurrent: boolean
}

export type Sections = Section[]

export type Subsection = {
    id: string
    ref: HTMLElement
    label?: string
    autoHeight: boolean
    isCurrent: boolean
}

export type Subsections = Subsection[]
