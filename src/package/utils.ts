import { get } from "svelte/store"
import {
    restrictMovement,
    isMoving,
    duration,
    sections,
    activeSectionNumber,
    scrollableSubSections,
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

// ---

export const canMoveToNextSubSection = () => {
    return (
        get(sections)[get(activeSectionNumber) - 1].activeSubSectionNumber <
        get(sections)[get(activeSectionNumber) - 1].subSections.length
    )
}

export const canMoveToPrevSubSection = () => {
    return (
        get(sections)[get(activeSectionNumber) - 1].activeSubSectionNumber > 1
    )
}

export const moveToNextSubSection = () => {
    sections.update(_sections => {
        _sections[get(activeSectionNumber) - 1].activeSubSectionNumber += 1
        return _sections
    })
}

export const moveToPrevSubSection = () => {
    sections.update(_sections => {
        _sections[get(activeSectionNumber) - 1].activeSubSectionNumber -= 1
        return _sections
    })
}

// ---

export const moveForward = () => {
    if (
        get(scrollableSubSections) &&
        get(sections)[get(activeSectionNumber) - 1].subSections.length > 0 &&
        canMoveToNextSubSection()
    ) {
        setIsMovingToTrue()
        moveToNextSubSection()
        setIsMovingToFalse()
    } else {
        moveSectionForward()
    }
}

export const moveBackward = () => {
    if (
        get(scrollableSubSections) &&
        get(sections)[get(activeSectionNumber) - 1].subSections.length > 0 &&
        canMoveToPrevSubSection()
    ) {
        setIsMovingToTrue()
        moveToPrevSubSection()
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
        resetSubSectionsToFirstPosition()
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
        resetSubSectionsToLastPosition()
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
