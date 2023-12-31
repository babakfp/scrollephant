import { writable, type Writable, derived } from "svelte/store"
import type { Props, Sections } from "./types.js"

export const movement: Writable<Props["movement"]> = writable("scroll")
export const direction: Writable<Props["direction"]> = writable("vertical")
export const loopUp: Writable<Props["loopUp"]> = writable(false)
export const loopDown: Writable<Props["loopDown"]> = writable(false)
export const restrictMovement: Writable<Props["restrictMovement"]> = writable(true) // prettier-ignore
export const scrollableSubsections: Writable<Props["scrollableSubsections"]> = writable(true) // prettier-ignore

export const rtl = writable(false)
export const sections = writable<Sections>([])
export const activeSectionNumber = writable(1)
export const isMoving = writable(false)
export const duration = writable<number>()
export const canMoveToPrevSection = derived(
    activeSectionNumber,
    $activeSectionNumber => $activeSectionNumber > 1
)
export const canMoveToNextSection = derived(
    [activeSectionNumber, sections],
    ([$activeSectionNumber, $sections]) =>
        $activeSectionNumber < $sections.length
)
