<script lang="ts">
    import { onMount, setContext } from "svelte"
    import { swipe, type SwipeEvent } from "./swipe.js"
    import type { Section } from "./types.js"
    import {
        movement as _movement,
        direction as _direction,
        loopUp as _loopUp,
        loopDown as _loopDown,
        restrictMovement as _restrictMovement,
        scrollableSubSections as _scrollableSubSections,
        //
        rtl,
        sections,
        activeSectionNumber,
        isMoving,
        duration,
        canMoveToPrevSection,
        canMoveToNextSection,
    } from "./stores.js"
    import {
        setIsMovingToTrue,
        setIsMovingToFalse,
        resetSubSectionsToFirstPosition,
        resetSubSectionsToLastPosition,
        moveToNextSection,
        moveToPrevSection,
        moveToFirstSection,
        moveToLastSection,
        canMoveToNextSubSection,
        canMoveToPrevSubSection,
        moveToNextSubSection,
        moveToPrevSubSection,
    } from "./utils.js"

    export let movement = _movement
    export let direction = _direction
    export let loopUp = _loopUp
    export let loopDown = _loopDown
    export let restrictMovement = _restrictMovement
    export let scrollableSubSections = _scrollableSubSections

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
        const { y, x } = getSectionYX($activeSectionNumber)
        translateY = y
        translateX = x
    }

    $: if ($sections.length > 0) {
        const { y, x } = getSubSectionYX(
            $sections[$activeSectionNumber - 1],
            $sections[$activeSectionNumber - 1]?.activeSubSectionNumber
        )
        $sections[$activeSectionNumber - 1].translateY = y
        $sections[$activeSectionNumber - 1].translateX = x
    }

    function onWindowResize() {
        if ($sections.length > 0) {
            const { y: ySection, x: xSection } =
                getSectionYX($activeSectionNumber)
            translateY = ySection
            translateX = xSection

            const { y: ySubSection, x: xSubSection } = getSubSectionYX(
                $sections[$activeSectionNumber - 1],
                $sections[$activeSectionNumber - 1]?.activeSubSectionNumber
            )
            $sections[$activeSectionNumber - 1].translateY = ySubSection
            $sections[$activeSectionNumber - 1].translateX = xSubSection
        }
    }

    function handleSwipe(e: SwipeEvent) {
        if ($restrictMovement && $isMoving) return

        if (["up", "left"].includes(e.detail.direction)) {
            moveForward()
        } else {
            moveBackward()
        }
    }

    function handleMousewheel(e: WheelEvent) {
        if ($restrictMovement && $isMoving) return

        if (isWheelingForward(e)) {
            moveForward()
        } else if (isWheelingBackward(e)) {
            moveBackward()
        }
    }

    function moveForward() {
        if (
            $scrollableSubSections &&
            $sections[$activeSectionNumber - 1].subSections.length > 0 &&
            canMoveToNextSubSection()
        ) {
            setIsMovingToTrue()
            moveToNextSubSection()
            setIsMovingToFalse()
        } else {
            moveSectionForward()
        }
    }
    setContext("moveForward", moveForward)

    function moveBackward() {
        if (
            $scrollableSubSections &&
            $sections[$activeSectionNumber - 1].subSections.length > 0 &&
            canMoveToPrevSubSection()
        ) {
            setIsMovingToTrue()
            moveToPrevSubSection()
            setIsMovingToFalse()
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
        } else if ($loopDown) {
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
        } else if ($loopUp) {
            setIsMovingToTrue()
            moveToLastSection()
            resetSubSectionsToLastPosition()
            setIsMovingToFalse()
        }
    }

    function getSectionYX(activeSectionNumber: number) {
        let y = 0
        let x = 0

        for (let i = 0; i < activeSectionNumber - 1; i++) {
            if ($direction === "vertical") {
                if ($sections[i]?.autoHeight) {
                    y += $sections[i]?.ref.clientHeight
                } else {
                    y += $sections[i + 1]?.ref.clientHeight
                }
            } else if ($direction === "horizontal") {
                x += $sections[i]?.ref.clientWidth
            }
        }

        return { y, x }
    }

    function getSubSectionYX(section: Section, activeSubSectionNumber: number) {
        let y = 0
        let x = 0

        if (section?.subSections.length > 0) {
            for (let i = 0; i < activeSubSectionNumber - 1; i++) {
                if ($direction === "vertical") {
                    x += section.subSections[i]?.ref.clientWidth
                } else if ($direction === "horizontal") {
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

    const isWheelingForward = (e: WheelEvent) => e.deltaY > 0
    const isWheelingBackward = (e: WheelEvent) => e.deltaY < 0
</script>

<svelte:window on:resize={onWindowResize} />

<div
    class="scrollephant"
    data-scrollephant-movement={$movement}
    data-scrollephant-direction={$direction}
    style:--scrollephant-translate-y="-{$movement === "scroll"
        ? translateY
        : 0}px"
    style:--scrollephant-translate-x="{!$rtl ? "-" : ""}{$movement === "scroll"
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
        overflow: hidden;
    }
</style>
