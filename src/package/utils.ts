import { get, type Writable } from "svelte/store"
import type { Sections } from "./types.js"

export function moveForward(
    canMoveForward: boolean,
    activeSectionNumber: Writable<number>,
    loopDown: boolean
) {
    if (canMoveForward) {
        activeSectionNumber.update(v => (v += 1))
    } else if (loopDown) {
        activeSectionNumber.set(1)
    }
}

export function moveBackward(
    canMoveBackward: boolean,
    activeSectionNumber: Writable<number>,
    sections: Writable<Sections>,
    loopUp: boolean
) {
    if (canMoveBackward) {
        activeSectionNumber.update(v => (v -= 1))
    } else if (loopUp) {
        activeSectionNumber.set(get(sections).length)
    }
}
