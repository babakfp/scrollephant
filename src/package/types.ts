export interface Props {
    movement: "scroll" | "fade"
    direction: "vertical" | "horizontal"
    loopUp: boolean
    loopDown: boolean
    unlimitedMovement: boolean
}

export type Sections = Section[] | []

export interface Section {
    id: number
    ref: HTMLElement
    label?: string
    autoHeight: boolean
    subSections?: Section[]
}
