import { writable, type Writable } from "svelte/store"
import type { Props } from "./types.js"

export const movement: Writable<Props["movement"]> = writable("scroll")
export const direction: Writable<Props["direction"]> = writable("vertical")
export const loopUp: Writable<Props["loopUp"]> = writable(false)
export const loopDown: Writable<Props["loopDown"]> = writable(false)
export const restrictMovement: Writable<Props["restrictMovement"]> = writable(true) // prettier-ignore
export const scrollableSubSections: Writable<Props["scrollableSubSections"]> = writable(true) // prettier-ignore
