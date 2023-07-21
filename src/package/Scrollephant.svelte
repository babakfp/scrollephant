<script lang="ts">
    import { onMount, setContext } from "svelte"
    import { writable, derived } from "svelte/store"
    import { swipe, type SwipeEvent } from "./swipe.js"
    import type { Props, Section, Sections } from "./types.js"

    export let movement: Props["movement"] = "scroll"
    export let direction: Props["direction"] = "vertical"
    export let loopUp: Props["loopUp"] = false
    export let loopDown: Props["loopDown"] = false
    export let restrictMovement: Props["restrictMovement"] = true
    export let scrollableSubSections: Props["scrollableSubSections"] = true

    setContext("movement", movement)
    setContext("direction", direction)
    setContext("loopUp", loopUp)
    setContext("loopDown", loopDown)
    setContext("restrictMovement", restrictMovement)
    setContext("scrollableSubSections", scrollableSubSections)

    const rtl = setContext("rtl", writable(false))
    const sections = setContext("sections", writable<Sections>([]))
    const activeSectionNumber = setContext("activeSectionNumber", writable(1))
    const isMoving = setContext("isMoving", writable(false))
    const duration = setContext("duration", writable<number>())
    const canMoveToPrevSection = setContext(
        "canMoveToPrevSection",
        derived(
            activeSectionNumber,
            $activeSectionNumber => $activeSectionNumber > 1
        )
    )
    const canMoveToNextSection = setContext(
        "canMoveToNextSection",
        derived(
            [activeSectionNumber, sections],
            ([$activeSectionNumber, $sections]) =>
                $activeSectionNumber < $sections.length
        )
    )

    let element: HTMLElement

    onMount(() => {
        if (document.dir === "rtl") {
            $rtl = true
        }

        $duration = Number(
            getComputedStyle(element)
                .getPropertyValue("--scrollephant-duration")
                .slice(0, -2)
        )
    })

    let translateY = 0
    let translateX = 0

    $: if ($sections.length > 0) {
        const { y, x } = getYX($activeSectionNumber)
        translateY = y
        translateX = x
    }

    $: if ($sections.length > 0) {
        const { y, x } = getYXSubSection(
            $sections[$activeSectionNumber - 1],
            $sections[$activeSectionNumber - 1]?.activeSubSectionNumber
        )
        $sections[$activeSectionNumber - 1].translateY = y
        $sections[$activeSectionNumber - 1].translateX = x
    }

    function onWindowResize() {
        const { y, x } = getYX($activeSectionNumber)
        translateY = y
        translateX = x
    }

    function getYX(activeSectionNumber: number) {
        let y = 0
        let x = 0

        for (let i = 0; i < activeSectionNumber - 1; i++) {
            if (direction === "vertical") {
                if ($sections[i]?.autoHeight) {
                    y += $sections[i]?.ref.clientHeight
                } else {
                    y += $sections[i + 1]?.ref.clientHeight
                }
            } else if (direction === "horizontal") {
                x += $sections[i]?.ref.clientWidth
            }
        }

        return { y, x }
    }

    function getYXSubSection(section: Section, activeSubSectionNumber: number) {
        let y = 0
        let x = 0

        if (section?.subSections.length > 0) {
            for (let i = 0; i < activeSubSectionNumber - 1; i++) {
                if (direction === "vertical") {
                    x += section.subSections[i]?.ref.clientWidth
                } else if (direction === "horizontal") {
                    if (section.subSections[i]?.autoHeight) {
                        y += section.subSections[i]?.ref.clientHeight
                    } else {
                        y += section.subSections[i + 1]?.ref.clientHeight
                    }
                }
            }
        }

        return { y, x }
    }

    function handleSwipe(e: SwipeEvent) {
        if (restrictMovement && $isMoving) return

        const isSwipeForward =
            (direction === "vertical" && e.detail.direction === "up") ||
            (direction === "horizontal" && e.detail.direction === "left")

        const isSwipeBackward =
            (direction === "vertical" && e.detail.direction === "down") ||
            (direction === "horizontal" && e.detail.direction === "right")

        if (isSwipeForward) {
            moveForward()
        } else if (isSwipeBackward) {
            moveBackward()
        }
    }

    function handleMousewheel(e: WheelEvent) {
        if (restrictMovement && $isMoving) return

        if (isWheelingForward(e)) {
            moveForward()
        } else if (isWheelingBackward(e)) {
            moveBackward()
        }
    }

    function moveForward() {
        if (
            scrollableSubSections &&
            $sections[$activeSectionNumber - 1].subSections.length > 0
        ) {
            if (canMoveToNextSubSection()) {
                setIsMovingToTrue()
                moveToNextSubSection()
                setIsMovingToFalse()
            } else {
                moveSectionForward()
            }
        } else {
            moveSectionForward()
        }
    }
    setContext("moveForward", moveForward)

    function moveBackward() {
        if (
            scrollableSubSections &&
            $sections[$activeSectionNumber - 1].subSections.length > 0
        ) {
            if (canMoveToPrevSubSection()) {
                setIsMovingToTrue()
                moveToPrevSubSection()
                setIsMovingToFalse()
            } else {
                moveSectionBackward()
            }
        } else {
            moveSectionBackward()
        }
    }
    setContext("moveBackward", moveBackward)

    function moveSectionForward() {
        if ($canMoveToNextSection) {
            setIsMovingToTrue()
            moveToNextSection()
            setIsMovingToFalse()
        } else if (loopDown) {
            setIsMovingToTrue()
            moveToFirstSection()
            resetSubSectionsToFirstPosition()
            setIsMovingToFalse()
        }
    }

    function moveSectionBackward() {
        if ($canMoveToPrevSection) {
            setIsMovingToTrue()
            moveToPrevSection()
            setIsMovingToFalse()
        } else if (loopUp) {
            setIsMovingToTrue()
            moveToLastSection()
            resetSubSectionsToLastPosition()
            setIsMovingToFalse()
        }
    }

    function resetSubSectionsToFirstPosition() {
        $sections.map(section => {
            section.activeSubSectionNumber = 1
            section.translateY = 0
            section.translateX = 0
            return section
        })
    }

    function resetSubSectionsToLastPosition() {
        $sections.map(section => {
            section.activeSubSectionNumber = section.subSections.length
            section.translateY = 0
            section.translateX = 0
            return section
        })
    }

    function canMoveToNextSubSection() {
        return (
            $sections[$activeSectionNumber - 1].activeSubSectionNumber <
            $sections[$activeSectionNumber - 1].subSections.length
        )
    }

    function canMoveToPrevSubSection() {
        return $sections[$activeSectionNumber - 1].activeSubSectionNumber > 1
    }

    function moveToNextSection() {
        $activeSectionNumber += 1
    }
    setContext("moveToNextSection", moveToNextSection)

    function moveToPrevSection() {
        $activeSectionNumber -= 1
    }
    setContext("moveToPrevSection", moveToPrevSection)

    function moveToNextSubSection() {
        $sections[$activeSectionNumber - 1].activeSubSectionNumber += 1
    }

    function moveToPrevSubSection() {
        $sections[$activeSectionNumber - 1].activeSubSectionNumber -= 1
    }

    function moveToFirstSection() {
        $activeSectionNumber = 1
    }
    setContext("moveToFirstSection", moveToFirstSection)

    function moveToLastSection() {
        $activeSectionNumber = $sections.length
    }
    setContext("moveToLastSection", moveToLastSection)

    function moveToFirstSubSection() {
        $sections[$activeSectionNumber - 1].activeSubSectionNumber = 1
    }

    function moveToLastSubSection() {
        $sections[$activeSectionNumber - 1].activeSubSectionNumber =
            $sections.length
    }

    function isWheelingForward(e: WheelEvent) {
        return e.deltaY > 0
    }

    function isWheelingBackward(e: WheelEvent) {
        return e.deltaY < 0
    }

    function setIsMovingToTrue() {
        if (restrictMovement) {
            $isMoving = true
        }
    }
    setContext("setIsMovingToTrue", setIsMovingToTrue)

    function setIsMovingToFalse() {
        if (restrictMovement) {
            setTimeout(() => {
                $isMoving = false
            }, $duration)
        }
    }
    setContext("setIsMovingToFalse", setIsMovingToFalse)
</script>

<svelte:window on:resize={onWindowResize} />

<div
    class="scrollephant"
    data-scrollephant-movement={movement}
    data-scrollephant-direction={direction}
    style:--scrollephant-translate-y="-{movement === "scroll"
        ? translateY
        : 0}px"
    style:--scrollephant-translate-x="{!$rtl ? "-" : ""}{movement === "scroll"
        ? translateX
        : 0}px"
    on:wheel|preventDefault={handleMousewheel}
    use:swipe
    on:swipe={handleSwipe}
    bind:this={element}
>
    <slot />
</div>

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }

    .scrollephant {
        --scrollephant-duration: 700ms;
        --scrollephant-timing-function: ease-out;
        position: relative;
    }
</style>
