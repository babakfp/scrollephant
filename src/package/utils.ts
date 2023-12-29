import { get } from "svelte/store"
import {
    restrictMovement,
    isMoving,
    duration,
    sections,
    activeSectionNumber,
} from "./stores.js"

export const setIsMovingToTrue = () => {
    if (get(restrictMovement)) {
        isMoving.set(true)
    }
}

export const setIsMovingToFalse = () => {
    if (get(restrictMovement)) {
        setTimeout(() => {
            isMoving.set(false)
        }, get(duration))
    }
}

// ---

export const moveToFirstSubSection = () => {
    sections.update(_sections => {
        _sections[get(activeSectionNumber) - 1].activeSubSectionNumber = 1
        return _sections
    })
}

export const moveToLastSubSection = () => {
    sections.update(_sections => {
        _sections[get(activeSectionNumber) - 1].activeSubSectionNumber =
            get(sections).length
        return _sections
    })
}
