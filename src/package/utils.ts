import { get } from "svelte/store"
import {
    restrictMovement,
    isMoving,
    duration,
    sections,
    currentSectionNumber,
    scrollableSubsections,
    canMoveToNextSection,
    loopDown,
    canMoveToPrevSection,
    loopUp,
    rtl,
} from "./stores.js"
import type { Subsections } from "./types.js"

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

export const moveToFirstSubsection = () => {
    sections.update(_sections => {
        _sections[get(currentSectionNumber) - 1].currentSubsectionNumber = 1
        return _sections
    })
}

export const moveToLastSubsection = () => {
    sections.update(_sections => {
        _sections[get(currentSectionNumber) - 1].currentSubsectionNumber =
            get(sections).length
        return _sections
    })
}

// ---

export const resetSubsectionsToFirstPosition = () => {
    sections.update(_sections =>
        _sections.map(section => {
            section.currentSubsectionNumber = 1
            section.translateY = 0
            section.translateX = 0
            return section
        })
    )
}

export const resetSubsectionsToLastPosition = () => {
    sections.update(_sections =>
        _sections.map(section => {
            section.currentSubsectionNumber = section.subsections.length
            section.translateY = 0
            section.translateX = 0
            return section
        })
    )
}

// ---

export const moveToNextSection = () => {
    currentSectionNumber.update(
        _currentSectionNumber => (_currentSectionNumber += 1)
    )
}

export const moveToPrevSection = () => {
    currentSectionNumber.update(
        _currentSectionNumber => (_currentSectionNumber -= 1)
    )
}

export const moveToFirstSection = () => {
    currentSectionNumber.set(1)
}

export const moveToLastSection = () => {
    currentSectionNumber.set(get(sections).length)
}

// ---

export const canMoveToNextSubsection = () => {
    return (
        get(sections)[get(currentSectionNumber) - 1].currentSubsectionNumber <
        get(sections)[get(currentSectionNumber) - 1].subsections.length
    )
}

export const canMoveToPrevSubsection = () => {
    return (
        get(sections)[get(currentSectionNumber) - 1].currentSubsectionNumber > 1
    )
}

export const moveToNextSubsection = () => {
    sections.update(_sections => {
        _sections[get(currentSectionNumber) - 1].currentSubsectionNumber += 1
        return _sections
    })
}

export const moveToPrevSubsection = () => {
    sections.update(_sections => {
        _sections[get(currentSectionNumber) - 1].currentSubsectionNumber -= 1
        return _sections
    })
}

// ---

export const moveForward = () => {
    if (
        get(scrollableSubsections) &&
        get(sections)[get(currentSectionNumber) - 1].subsections.length > 0 &&
        canMoveToNextSubsection()
    ) {
        setIsMovingToTrue()
        moveToNextSubsection()
        setIsMovingToFalse()
    } else {
        moveSectionForward()
    }
}

export const moveBackward = () => {
    if (
        get(scrollableSubsections) &&
        get(sections)[get(currentSectionNumber) - 1].subsections.length > 0 &&
        canMoveToPrevSubsection()
    ) {
        setIsMovingToTrue()
        moveToPrevSubsection()
        setIsMovingToFalse()
    } else {
        moveSectionBackward()
    }
}

export const moveSectionForward = () => {
    if (get(canMoveToNextSection)) {
        setIsMovingToTrue()
        moveToNextSection()
        setIsMovingToFalse()
    } else if (get(loopDown)) {
        setIsMovingToTrue()
        moveToFirstSection()
        resetSubsectionsToFirstPosition()
        setIsMovingToFalse()
    }
}

export const moveSectionBackward = () => {
    if (get(canMoveToPrevSection)) {
        setIsMovingToTrue()
        moveToPrevSection()
        setIsMovingToFalse()
    } else if (get(loopUp)) {
        setIsMovingToTrue()
        moveToLastSection()
        resetSubsectionsToLastPosition()
        setIsMovingToFalse()
    }
}

// ---

export const getRTL = () => {
    if (document.dir === "rtl") {
        rtl.set(true)
    }
}

export const getDuration = (element: HTMLElement) => {
    duration.set(
        Number(
            getComputedStyle(element)
                .getPropertyValue("--scrollephant-duration")
                .slice(0, -2)
        )
    )
}

export const addSection = (
    id: string,
    element: HTMLElement,
    label: string,
    autoHeight: boolean,
    subsections: Subsections
) => {
    sections.update(_sections =>
        _sections.concat({
            id,
            ref: element,
            label,
            autoHeight,
            subsections: subsections,
            translateY: 0,
            translateX: 0,
            currentSubsectionNumber: 1,
        })
    )
}

export const deleteSectionById = (id: string) => {
    sections.update(_sections => _sections.filter(section => section.id !== id))
}
