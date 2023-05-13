import { get, type Writable } from "svelte/store"
import type { Sections } from "./types.js"

export function moveForward(
    canMoveForward: boolean,
    activeSectionNumber: Writable<number>,
    loopFromEnd: boolean
) {
    if (canMoveForward) {
        activeSectionNumber.update(v => (v += 1))
    } else if (loopFromEnd) {
        activeSectionNumber.set(1)
    }
}

export function moveBackward(
    canMoveBackward: boolean,
    activeSectionNumber: Writable<number>,
    sections: Writable<Sections>,
    loopFromStart: boolean
) {
    if (canMoveBackward) {
        activeSectionNumber.update(v => (v -= 1))
    } else if (loopFromStart) {
        activeSectionNumber.set(get(sections).length)
    }
}
