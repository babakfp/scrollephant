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
}

export type Sections = Section[] | []

export interface SubSection {
    id: number
    ref: HTMLElement
    label: string
}

export type SubSections = SubSection[] | []
