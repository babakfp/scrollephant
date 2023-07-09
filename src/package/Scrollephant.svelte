<script lang="ts">
    import { onMount, setContext } from "svelte"
    import { writable } from "svelte/store"
    import type { Props, Section, Sections } from "./types.js"
    import { swipe, type SwipeEvent } from "./swipe.js"

    export let movement = setContext(
        "movement",
        writable<Props["movement"]>("scroll")
    )
    export let direction: Props["direction"] = "vertical"
    export let loopUp: Props["loopUp"] = false
    export let loopDown: Props["loopDown"] = false
    export let restrictMovement: Props["restrictMovement"] = true

    setContext("direction", direction)
    setContext("loopUp", loopUp)
    setContext("loopDown", loopDown)

    const sections = setContext("sections", writable<Sections>([]))
    const activeSectionNumber = setContext("activeSectionNumber", writable(1))
    const activeSubSectionNumber = setContext(
        "activeSubSectionNumber",
        writable(1)
    )
    const isMoving = setContext("isMoving", writable(false))

    let element: HTMLElement
    let duration: number

    const rtl = setContext("rtl", writable(false))

    onMount(() => {
        if (document.dir === "rtl") {
            $rtl = true
        }

        duration = Number(
            getComputedStyle(element)
                .getPropertyValue("--scrollephant-duration")
                .slice(0, -2)
        )
    })

    let translateY = 0
    let translateX = 0

    let translateYSubSection = setContext("translateYSubSection", writable(0))
    let translateXSubSection = setContext("translateXSubSection", writable(0))

    $: {
        const { y, x } = getYX($activeSectionNumber)
        translateY = y
        translateX = x
    }

    $: {
        const { y, x } = getYXSubSection(
            $sections[$activeSectionNumber - 1],
            $activeSubSectionNumber
        )
        $translateYSubSection = y
        $translateXSubSection = x
        console.log($translateYSubSection, $translateXSubSection)
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

        return {
            y,
            x,
        }
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

        return {
            y,
            x,
        }
    }

    function handleSwipe(e: SwipeEvent) {
        if (restrictMovement && $isMoving) {
            return
        }

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

        if (restrictMovement && $isMoving) {
            setTimeout(() => {
                $isMoving = false
            }, duration)
        }
    }

    function handleMousewheel(e: WheelEvent) {
        if (restrictMovement && $isMoving) {
            return
        }

        if (isWheelingForward(e)) {
            moveForward()
        } else if (isWheelingBackward(e)) {
            moveBackward()
        }

        if (restrictMovement && $isMoving) {
            setTimeout(() => {
                $isMoving = false
            }, duration)
        }
    }

    function moveForward() {
        const currentSection = $sections[$activeSectionNumber - 1]

        if (
            currentSection.isSubSectionWrapper &&
            currentSection.subSections.length > 0
        ) {
            if (canMoveToNextSubSection()) {
                if (restrictMovement) {
                    $isMoving = true
                }
                moveToNextSubSection()
            } else {
                moveSectionForward()
            }
        } else {
            moveSectionForward()
        }
    }

    function moveBackward() {
        const currentSection = $sections[$activeSectionNumber - 1]

        if (
            currentSection.isSubSectionWrapper &&
            currentSection.subSections.length > 0
        ) {
            if (canMoveToPrevSubSection()) {
                if (restrictMovement) {
                    $isMoving = true
                }
                moveToPrevSubSection()
            } else {
                moveSectionBackward()
            }
        } else {
            moveSectionBackward()
        }
    }

    function moveSectionForward() {
        if (canMoveToNext()) {
            if (restrictMovement) {
                $isMoving = true
            }
            moveToNext()
        } else if (loopDown) {
            if (restrictMovement) {
                $isMoving = true
            }
            jumpToFirstSubSection()
        }
    }

    function moveSectionBackward() {
        if (canMoveToPrev()) {
            if (restrictMovement) {
                $isMoving = true
            }
            moveToPrev()
        } else if (loopUp) {
            if (restrictMovement) {
                $isMoving = true
            }
            jumpToLast()
        }
    }

    function canMoveToNext() {
        return $activeSectionNumber < $sections.length
    }

    function canMoveToPrev() {
        return $activeSectionNumber > 1
    }

    function canMoveToNextSubSection() {
        return (
            $activeSubSectionNumber <
            $sections[$activeSectionNumber - 1].subSections.length
        )
    }

    function canMoveToPrevSubSection() {
        return $activeSubSectionNumber > 1
    }

    function moveToNext() {
        $activeSectionNumber += 1
    }

    function moveToPrev() {
        $activeSectionNumber -= 1
    }

    function moveToNextSubSection() {
        $activeSubSectionNumber += 1
    }

    function moveToPrevSubSection() {
        $activeSubSectionNumber -= 1
    }

    function jumpToFirst() {
        $activeSectionNumber = 1
    }

    function jumpToLast() {
        $activeSectionNumber = $sections.length
    }

    function jumpToFirstSubSection() {
        $activeSubSectionNumber = 1
    }

    function jumpToLastSubSection() {
        $activeSubSectionNumber = $sections.length
    }

    function isWheelingForward(e: WheelEvent) {
        return e.deltaY > 0
    }

    function isWheelingBackward(e: WheelEvent) {
        return e.deltaY < 0
    }
</script>

<svelte:window on:resize={onWindowResize} />

<div
    class="scrollephant"
    data-scrollephant-movement={$movement}
    data-scrollephant-direction={direction}
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
    .scrollephant {
        --scrollephant-duration: 700ms;
        --scrollephant-timing-function: ease-out;
        overflow: hidden;
    }

    .scrollephant[data-scrollephant-direction="vertical"] {
        --scrollephant-translate-y: 0;
    }

    .scrollephant[data-scrollephant-direction="horizontal"] {
        --scrollephant-translate-x: 0;
    }
</style>
