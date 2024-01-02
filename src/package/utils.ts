import { get, type Writable } from "svelte/store"
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
    sections.update(_sections => {
        return _sections.map(section => {
            if (section.isCurrent) {
                section.subsections = section.subsections.map(
                    (subsection, i) => {
                        subsection.isCurrent = i === 0
                        return subsection
                    }
                )
            }
            return section
        })
    })
}

export const moveToLastSubsection = () => {
    sections.update(_sections => {
        return _sections.map(section => {
            if (section.isCurrent) {
                const subsectionsLastIndex = section.subsections.length - 1
                section.subsections = section.subsections.map(
                    (subsection, i) => {
                        subsection.isCurrent = i === subsectionsLastIndex
                        return subsection
                    }
                )
            }
            return section
        })
    })
}

// ---

export const resetSubsectionsToFirstPosition = () => {
    sections.update(_sections =>
        _sections.map(section => {
            section.subsections = section.subsections.map((subsection, i) => {
                subsection.isCurrent = i === 0
                return subsection
            })
            section.translateY = 0
            section.translateX = 0
            return section
        })
    )
}

export const resetSubsectionsToLastPosition = () => {
    sections.update(_sections =>
        _sections.map(section => {
            const subsectionsLastIndex = section.subsections.length - 1
            section.subsections = section.subsections.map((subsection, i) => {
                subsection.isCurrent = i === subsectionsLastIndex
                return subsection
            })
            section.translateY = 0
            section.translateX = 0
            return section
        })
    )
}

// ---

export const moveToNextSection = () => {
    let currentSectionIndex: number
    sections.update(_sections =>
        _sections.map((section, i) => {
            if (section.isCurrent) {
                section.isCurrent = false
                currentSectionIndex = i
            }
            if (currentSectionIndex + 1 === i) {
                section.isCurrent = true
            }
            return section
        })
    )
}

export const moveToPrevSection = () => {
    let currentSectionIndex: number
    sections.update(_sections =>
        _sections.map((section, i) => {
            if (section.isCurrent) {
                section.isCurrent = false
                currentSectionIndex = i
            }
            if (currentSectionIndex - 1 === i) {
                section.isCurrent = true
            }
            return section
        })
    )
}

export const moveToFirstSection = () => {
    const id = getSectionByIndex(0)?.id
    if (id) {
        setSectionToCurrent(id)
    }
}

export const moveToLastSection = () => {
    const sectionsLastIndex = get(sections).length - 1
    const id = getSectionByIndex(sectionsLastIndex)?.id
    if (id) {
        setSectionToCurrent(id)
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
    sections.update(_sections =>
        _sections.map(section => {
            if (section.isCurrent) {
                section.subsections = section.subsections.map(
                    (subsection, i) => {
                        if (subsection.isCurrent) {
                            subsection.isCurrent = false
                            currentSubsectionIndex = i
                        } else if (currentSubsectionIndex) {
                            subsection.isCurrent = true
                        }

                        return subsection
                    }
                )
            }
            return section
        })
    )
}

export const moveToPrevSubsection = () => {
    // let currentSubsectionIndex: number
    // sections.update(_sections =>
    //     _sections.map(section => {
    //         if (section.isCurrent) {
    //             section.subsections = section.subsections.map(
    //                 (subsection, i) => {
    //                     if (subsection.isCurrent) {
    //                         subsection.isCurrent = false
    //                         currentSubsectionIndex = i
    //                     } else if (currentSubsectionIndex) {
    //                         subsection.isCurrent = true
    //                     }
    //                     return subsection
    //                 }
    //             )
    //         }
    //         return section
    //     })
    // )
    // sections.update(_sections => {
    //     _sections[get(currentSectionNumber) - 1].currentSubsectionNumber -= 1
    //     return _sections
    // })
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
            isCurrent: false,
        })
    )
}

export const deleteSectionById = (id: string) => {
    sections.update(_sections => _sections.filter(section => section.id !== id))
}

// ---

export const getSectionWrapperPositions = () => {
    let y = 0
    let x = 0

    const currentSectionIndex = getCurrentSectionIndex()
    for (let i = 0; i < (currentSectionIndex ? currentSectionIndex : 0); i++) {
        if (get(direction) === "vertical") {
            if (get(sections)[i]?.autoHeight) {
                y += get(sections)[i]?.ref.clientHeight
            } else {
                y += get(sections)[i + 1]?.ref.clientHeight
            }
        } else if (get(direction) === "horizontal") {
            x += get(sections)[i]?.ref.clientWidth
        }
    }

    return { y, x }
}

const getSubsectionWrapperPositions = (
    section: Section,
    currentSubsectionNumber: number
) => {
    let y = 0
    let x = 0

    // if (!!section?.subsections.length) {
    //     for (let i = 0; i < currentSubsectionNumber - 1; i++) {
    //         if (get(direction) === "vertical") {
    //             x += section.subsections[i]?.ref.clientWidth
    //         } else if (get(direction) === "horizontal") {
    //             if (section.subsections[i]?.autoHeight) {
    //                 y += section.subsections[i]?.ref.clientHeight
    //             } else {
    //                 y += section.subsections[i + 1]?.ref.clientHeight
    //             }
    //         }
    //     }
    // }

    return { y, x }
}

export const setSubsectionWrapperPositions = () => {
    const { y, x } = getSubsectionWrapperPositions(
        getCurrentSection()!,
        getCurrentSubsectionIndexOfCurrentSection()!
    )
    // sections.update(_sections => {
    //     _sections[get(currentSectionNumber) - 1].translateY = y
    //     return _sections
    // })
    // sections.update(_sections => {
    //     _sections[get(currentSectionNumber) - 1].translateX = x
    //     return _sections
    // })
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

/**
 * @param id - Section ID.
 */
export const setSectionToCurrent = (id: string) => {
    sections.update(_sections => {
        return _sections.map(section => {
            section.isCurrent = section.id === id
            return section
        })
    })
}

export const getCurrentSection = () => {
    return get(sections).find(section => section.isCurrent === true)
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
export const setSubsectionOfCurrentSectionToCurrent = (id: string) => {
    sections.update(_sections => {
        return _sections.map(section => {
            if (section.isCurrent) {
                section.subsections = section.subsections.map(subsection => {
                    subsection.isCurrent = subsection.id === id
                    return subsection
                })
            }
            return section
        })
    })
}

/**
 * @param id - Subsection ID.
 */
export const getCurrentSubsectionOfCurrentSection = (id: string) => {
    return getCurrentSection()?.subsections.find(
        subsection => subsection.id === id
    )
}

/**
 * @param id - Subsection ID.
 */
export const getCurrentSubsectionIndexOfCurrentSection = () => {
    const currentSection = getCurrentSection()
    if (currentSection) {
        for (const [i, subsection] of Object.entries(
            currentSection.subsections
        )) {
            if (subsection.isCurrent) {
                return Number(i)
            }
        }
    }
}

/**
 * @param id - Subsection ID.
 */
export const isCurrentSubsectionOfCurrentSection = (id: string) => {
    return !!getCurrentSubsectionOfCurrentSection(id)
}

const getCurrentSectionIndex = () => {
    for (const [index, section] of Object.entries(get(sections))) {
        if (section.isCurrent) {
            return Number(index)
        }
    }
}

const getSectionByIndex = (i: number) => {
    return get(sections).at(i)
}
