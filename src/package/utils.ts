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

// ---

export const resetSubSectionsToFirstPosition = () => {
    sections.update(_sections =>
        _sections.map(section => {
            section.activeSubSectionNumber = 1
            section.translateY = 0
            section.translateX = 0
            return section
        })
    )
}

export const resetSubSectionsToLastPosition = () => {
    sections.update(_sections =>
        _sections.map(section => {
            section.activeSubSectionNumber = section.subSections.length
            section.translateY = 0
            section.translateX = 0
            return section
        })
    )
}

// ---

export const moveToNextSection = () => {
    activeSectionNumber.update(
        _activeSectionNumber => (_activeSectionNumber += 1)
    )
}

export const moveToPrevSection = () => {
    activeSectionNumber.update(
        _activeSectionNumber => (_activeSectionNumber -= 1)
    )
}

export const moveToFirstSection = () => {
    activeSectionNumber.set(1)
}

export const moveToLastSection = () => {
    activeSectionNumber.set(get(sections).length)
}
