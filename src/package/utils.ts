import { get } from "svelte/store"
import {
    restrictMovement,
    isMoving,
    duration,
    sections,
    scrollableSubsections,
    canMoveToNextSection,
    loopDown,
    canMoveToPrevSection,
    loopUp,
    rtl,
    direction,
} from "./stores.js"
import type { Section, Sections, Subsections } from "./types.js"

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
    updateCurrentSection(section => {
        section.subsections = section.subsections.map((subsection, i) => {
            subsection.isCurrent = i === 0
            return subsection
        })
        return section
    })
}

export const moveToLastSubsection = () => {
    updateCurrentSection(section => {
        const subsectionsLastIndex = section.subsections.length - 1
        section.subsections = section.subsections.map((subsection, i) => {
            subsection.isCurrent = i === subsectionsLastIndex
            return subsection
        })
        return section
    })
}

// ---

export const resetSubsectionsToFirstPosition = () => {
    updateSections(section => ({
        ...section,
        translateY: 0,
        translateX: 0,
        subsections: section.subsections.map((subsection, i) => ({
            ...subsection,
            isCurrent: i === 0,
        })),
    }))
}

export const resetSubsectionsToLastPosition = () => {
    updateSections(section => {
        const subsectionsLastIndex = section.subsections.length - 1
        section.subsections = section.subsections.map((subsection, i) => {
            subsection.isCurrent = i === subsectionsLastIndex
            return subsection
        })
        section.translateY = 0
        section.translateX = 0
        return section
    })
}

// ---

export const moveToNextSection = () => {
    let currentSectionIndex: number
    updateSections((section, i) => {
        if (section.isCurrent) {
            section.isCurrent = false
            currentSectionIndex = i
        }
        if (currentSectionIndex + 1 === i) {
            section.isCurrent = true
        }
        return section
    })
}

export const moveToPrevSection = () => {
    sections.update(_sections => {
        for (let i = 0; i < _sections.length; i++) {
            if (_sections[i].isCurrent) {
                _sections[i].isCurrent = false
                _sections[i - 1].isCurrent = true
            }
        }

        return _sections
    })
}

export const moveToFirstSection = () => {
    const id = getSectionByIndex(0)?.id
    if (id) {
        setSectionToCurrentById(id)
    }
}

export const moveToLastSection = () => {
    const sectionsLastIndex = get(sections).length - 1
    const id = getSectionByIndex(sectionsLastIndex)?.id
    if (id) {
        setSectionToCurrentById(id)
    }
}

// ---

export const canMoveToNextSubsection = () => {
    const subsections = getCurrentSection()?.subsections
    if (subsections) {
        for (const [i, subsection] of Object.entries(subsections)) {
            if (subsection.isCurrent) {
                if (Number(i) < subsections.length - 1) {
                    return true
                }
            }
        }
    }
    return false
}

export const canMoveToPrevSubsection = () => {
    const subsections = getCurrentSection()?.subsections
    if (subsections) {
        for (const [i, subsection] of Object.entries(subsections)) {
            if (subsection.isCurrent) {
                if (Number(i) > subsections.length - 1) {
                    return true
                }
            }
        }
    }
    return false
}

export const moveToNextSubsection = () => {
    let currentSubsectionIndex: number
    updateCurrentSection(section => {
        section.subsections = section.subsections.map((subsection, i) => {
            if (subsection.isCurrent) {
                subsection.isCurrent = false
                currentSubsectionIndex = i
            } else if (currentSubsectionIndex) {
                subsection.isCurrent = true
            }
            return subsection
        })
        return section
    })
}

export const moveToPrevSubsection = () => {
    let currentSubsectionIndex: number
    updateCurrentSection(section => {
        section.subsections = section.subsections.map((subsection, i) => {
            if (subsection.isCurrent) {
                subsection.isCurrent = false
                currentSubsectionIndex = i
            } else if (currentSubsectionIndex) {
                updateCurrentSection(section => {
                    section.subsections = section.subsections.map(
                        (subsection, i) => {
                            if (currentSubsectionIndex === i) {
                                subsection.isCurrent = true
                            }
                            return subsection
                        }
                    )
                    return section
                })
            }
            return subsection
        })
        return section
    })
}

// ---

export const moveForward = () => {
    if (
        get(scrollableSubsections) &&
        !!getCurrentSection()?.subsections.length &&
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
        !!getCurrentSection()?.subsections.length &&
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
    console.log(`get(canMoveToPrevSection)`, get(canMoveToPrevSection))
    //
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
            isCurrent: _sections.length === 0 ? true : false,
        })
    )
}

export const deleteSectionById = (id: string) => {
    sections.update(_sections => _sections.filter(section => section.id !== id))
}

// ---

const getSubsectionWrapperPositions = () => {
    let y = 0
    let x = 0

    const section = getCurrentSection()
    const subsections = section?.subsections

    if (!!subsections?.length) {
        for (let i = 0; i < getCurrentSubsectionIndex(subsections)!; i++) {
            const subsection = subsections[i]
            if (get(direction) === "vertical") {
                x += subsection.ref.clientWidth
            } else if (get(direction) === "horizontal") {
                if (subsection.autoHeight) {
                    y += subsection.ref.clientHeight
                } else {
                    y += subsections[i + 1]?.ref.clientHeight
                }
            }
        }
    }

    return { y, x }
}

export const setSubsectionWrapperPositions = () => {
    const { y, x } = getSubsectionWrapperPositions()
    updateCurrentSection(section => ({
        ...section,
        translateY: y,
        translateX: x,
    }))
}

// ---

const isWheelingForward = (e: WheelEvent) => e.deltaY > 0
const isWheelingBackward = (e: WheelEvent) => e.deltaY < 0

export const moveOnMouseWheel = (e: WheelEvent) => {
    if (get(restrictMovement) && get(isMoving)) return

    if (isWheelingForward(e)) {
        moveForward()
    } else if (isWheelingBackward(e)) {
        moveBackward()
    }
}

// ---

const getSectionByIndex = (i: number) => get(sections).at(i)

/**
 * TODO: Remove `_sections` and use runes.
 * @param id - Section ID.
 * @param _sections - Add this to make it reactive.
 */
export const getSectionById = (id: string, _sections?: Sections) => {
    return get(sections).find(section => section.id === id)
}

/**
 * TODO: Remove `_sections` and use runes.
 * @param id - Section ID.
 * @param _sections - Add this to make it reactive.
 */
export const isSectionCurrentById = (id: string, _sections?: Sections) => {
    return !!getSectionById(id)?.isCurrent
}

export const getCurrentSection = () => {
    return get(sections).find(section => section.isCurrent)
}

export const getCurrentSectionIndex = () => {
    const currentIndex = get(sections).findIndex(section => section.isCurrent)
    return currentIndex !== -1 ? currentIndex : undefined
}

export const updateSections = (
    fallback: (section: Section, i: number) => Section
) => {
    sections.update(_sections =>
        _sections.map((section, i) => fallback(section, i))
    )
}

export const updateCurrentSection = (
    fallback: (section: Section, i: number) => Section
) => {
    updateSections((section, i) =>
        section.isCurrent ? fallback(section, i) : section
    )
}

/**
 * @param id - Section ID.
 */
export const setSectionToCurrentById = (id: string) => {
    updateSections(section => ({ ...section, isCurrent: section.id === id }))
}

// ---

export const getSubsectionByIndex = (subsections: Subsections, i: number) => {
    return subsections.at(i)
}

/**
 * @param id - Subsection ID.
 */
export const getSubsectionById = (subsections: Subsections, id: string) => {
    return subsections.find(subsection => subsection.id === id)
}

/**
 * @param id - Section ID.
 */
export const isSubsectionCurrentById = (
    subsections: Subsections,
    id: string
) => {
    return !!getSubsectionById(subsections, id)?.isCurrent
}

export const getCurrentSubsection = (subsections: Subsections) => {
    return subsections.find(subsection => subsection.isCurrent)
}

export const getCurrentSubsectionIndex = (subsections: Subsections) => {
    const currentIndex = subsections.findIndex(
        subsection => subsection.isCurrent
    )
    return currentIndex !== -1 ? currentIndex : undefined
}

export const getSubsection = (subsectionId: string, sectionId?: string) => {
    if (sectionId) {
        const section = getSectionById(sectionId)
        if (section) {
            for (const subsection of section.subsections) {
                if (subsection.id === subsectionId) {
                    return subsection
                }
            }
        }
    } else {
        for (const section of get(sections)) {
            for (const subsection of section.subsections) {
                if (subsection.id === subsectionId) {
                    return subsection
                }
            }
        }
    }
}

/**
 * @param id - Subsection ID.
 */
export const setSubsectionOfCurrentSectionToCurrentById = (id: string) => {
    updateCurrentSection(section => ({
        ...section,
        subsections: section.subsections.map(subsection => ({
            ...subsection,
            isCurrent: subsection.id === id,
        })),
    }))
}

/**
 * @param id - Subsection ID.
 */
export const getCurrentSubsectionOfCurrentSection = () => {
    return getCurrentSection()?.subsections.find(
        subsection => subsection.isCurrent
    )
}

/**
 * TODO: Remove `_sections` and use runes.
 * @param id - Subsection ID.
 * @param _sections - Add this to make it reactive.
 */
export const isSubsectionCurrentOfCurrentSectionById = (
    id: string,
    _sections?: Sections
) => {
    const subsections = getCurrentSection()?.subsections
    return subsections ? isSubsectionCurrentById(subsections, id) : false
}

export const getCurrentSubsectionIndexOfCurrentSection = () => {
    const currentSection = getCurrentSection()
    if (currentSection) {
        return getCurrentSubsectionIndex(currentSection.subsections)
    }
}
