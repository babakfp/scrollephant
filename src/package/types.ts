export type Sections = Section[] | []

export interface Section {
    id: number
    ref: HTMLElement
    label?: string
    subSections?: Section[]
}
