export type ControlsType = {
    sections: {
        label?: string
        autoHeight?: boolean
        textContent?: string
        subsections?: {
            label?: string
            autoHeight?: boolean
            textContent?: string
        }[]
    }[]
    arrowPrev?: boolean
    dots?: boolean
    arrowNext?: boolean
    useSubsectionsDots?: boolean
}
