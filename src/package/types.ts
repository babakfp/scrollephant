export type Direction = "vertical" | "horizontal"

export type Sections = Section[] | []

export interface Section {
    id: number
    ref: HTMLElement
    label?: string
    autoHeight: boolean
    subSections?: Section[]
}
