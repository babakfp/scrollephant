import { writable, type Writable, derived } from "svelte/store"
import type { Props, Sections } from "./types.js"
import { getCurrentSectionIndex } from "./utils.js"

export const movement: Writable<Props["movement"]> = writable("scroll")
export const direction: Writable<Props["direction"]> = writable("vertical")
export const loopUp: Writable<Props["loopUp"]> = writable(false)
export const loopDown: Writable<Props["loopDown"]> = writable(false)
export const restrictMovement: Writable<Props["restrictMovement"]> = writable(true) // prettier-ignore
export const scrollableSubsections: Writable<Props["scrollableSubsections"]> = writable(true) // prettier-ignore

export const rtl = writable(false)
export const sections = writable<Sections>([])
export const isMoving = writable(false)
export const duration = writable<number>()

export const canMoveToPrevSection = derived(
    sections,
    _$sections => getCurrentSectionIndex()! > 0
)
export const canMoveToNextSection = derived(
    sections,
    $sections => getCurrentSectionIndex()! < $sections.length - 1
)

export const sectionWrapperPositions = derived(
    [sections, direction],
    ([$sections, $direction]) => {
        let y = 0
        let x = 0

        for (let i = 0; i < getCurrentSectionIndex()!; i++) {
            const section = $sections[i]
            if ($direction === "vertical") {
                if (section.autoHeight) {
                    y += section.ref.clientHeight
                } else {
                    y += $sections[i + 1]?.ref.clientHeight
                }
            } else if ($direction === "horizontal") {
                x += section.ref.clientWidth
            }
        }

        return { y, x }
    }
)
