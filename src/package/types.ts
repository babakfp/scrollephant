export type Sections = Section[] | []

export interface Section {
    ref: HTMLElement
    label?: string
    subSections?: Section[]
}
