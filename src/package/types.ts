export interface Props {
    movement: "scroll" | "fade"
    direction: "vertical" | "horizontal"
    loopUp: boolean
    loopDown: boolean
    restrictMovement: boolean
}

export interface Section {
    id: number
    ref: HTMLElement
    label?: string
    autoHeight: boolean
    subSections: SubSections
    isSubSectionWrapper: boolean
    translateY: number
    translateX: number
}

export type Sections = Section[] | []

export interface SubSection {
    id: number
    ref: HTMLElement
    label: string
    autoHeight: boolean
}

export type SubSections = SubSection[] | []
