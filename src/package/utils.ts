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
        moveToFirst(activeSectionNumber)
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
        moveToLast(activeSectionNumber, sections)
    }
}

export function moveToFirst(activeSectionNumber: Writable<number>) {
    activeSectionNumber.set(1)
}

export function moveToLast(
    activeSectionNumber: Writable<number>,
    sections: Writable<Sections>
) {
    activeSectionNumber.set(get(sections).length)
}
