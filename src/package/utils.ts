import { get } from "svelte/store"
import {
    restrictMovement,
    isMoving,
    duration,
    sections,
    activeSectionNumber,
    scrollableSubsections,
    canMoveToNextSection,
    loopDown,
    canMoveToPrevSection,
    loopUp,
    rtl,
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

export const moveToFirstSubsection = () => {
    sections.update(_sections => {
        _sections[get(activeSectionNumber) - 1].activeSubsectionNumber = 1
        return _sections
    })
}

export const moveToLastSubsection = () => {
    sections.update(_sections => {
        _sections[get(activeSectionNumber) - 1].activeSubsectionNumber =
            get(sections).length
        return _sections
    })
}

// ---

export const resetSubsectionsToFirstPosition = () => {
    sections.update(_sections =>
        _sections.map(section => {
            section.activeSubsectionNumber = 1
            section.translateY = 0
            section.translateX = 0
            return section
        })
    )
}

export const resetSubsectionsToLastPosition = () => {
    sections.update(_sections =>
        _sections.map(section => {
            section.activeSubsectionNumber = section.subsections.length
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

// ---

export const canMoveToNextSubsection = () => {
    return (
        get(sections)[get(activeSectionNumber) - 1].activeSubsectionNumber <
        get(sections)[get(activeSectionNumber) - 1].subsections.length
    )
}

export const canMoveToPrevSubsection = () => {
    return (
        get(sections)[get(activeSectionNumber) - 1].activeSubsectionNumber > 1
    )
}

export const moveToNextSubsection = () => {
    sections.update(_sections => {
        _sections[get(activeSectionNumber) - 1].activeSubsectionNumber += 1
        return _sections
    })
}

export const moveToPrevSubsection = () => {
    sections.update(_sections => {
        _sections[get(activeSectionNumber) - 1].activeSubsectionNumber -= 1
        return _sections
    })
}

// ---

export const moveForward = () => {
    if (
        get(scrollableSubsections) &&
        get(sections)[get(activeSectionNumber) - 1].subsections.length > 0 &&
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
        get(sections)[get(activeSectionNumber) - 1].subsections.length > 0 &&
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
