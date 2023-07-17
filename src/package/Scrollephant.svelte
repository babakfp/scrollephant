<script lang="ts">
    import { onMount, setContext } from "svelte"
    import { writable } from "svelte/store"
    import type { Props, Section, Sections } from "./types.js"
    import { swipe, type SwipeEvent } from "./swipe.js"

    export let movement = setContext("movement", <Props["movement"]>"scroll")
    export let direction = setContext("direction", <Props["direction"]>"vertical")
    export let loopUp = setContext("loopUp", <Props["loopUp"]>false)
    export let loopDown = setContext("loopDown", <Props["loopDown"]>false)
    export let restrictMovement = setContext(
        "restrictMovement",
        <Props["restrictMovement"]>true
    )
    export let scrollableSubSections: Props["scrollableSubSections"] = true

    const sections = setContext("sections", writable<Sections>([]))
    const activeSectionNumber = setContext("activeSectionNumber", writable(1))
    const isMoving = setContext("isMoving", writable(false))
    const duration = setContext("duration", writable<number>())

    let element: HTMLElement

    const rtl = setContext("rtl", writable(false))

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

        setIsMovingToFalse()
    }

    function handleMousewheel(e: WheelEvent) {
        if (restrictMovement && $isMoving) return

        if (isWheelingForward(e)) {
            moveForward()
        } else if (isWheelingBackward(e)) {
            moveBackward()
        }

        setIsMovingToFalse()
    }

    function moveForward() {
        if (
            scrollableSubSections &&
            $sections[$activeSectionNumber - 1].subSections.length > 0
        ) {
            if (canMoveToNextSubSection()) {
                setIsMovingToTrue()
                moveToNextSubSection()
            } else {
                moveSectionForward()
            }
        } else {
            moveSectionForward()
        }
    }

    function moveBackward() {
        if (
            scrollableSubSections &&
            $sections[$activeSectionNumber - 1].subSections.length > 0
        ) {
            if (canMoveToPrevSubSection()) {
                setIsMovingToTrue()
                moveToPrevSubSection()
            } else {
                moveSectionBackward()
            }
        } else {
            moveSectionBackward()
        }
    }

    function moveSectionForward() {
        if (canMoveToNextSection()) {
            setIsMovingToTrue()
            moveToNextSection()
        } else if (loopDown) {
            setIsMovingToTrue()
            moveToFirstSection()
            resetSubSectionsToFirstPosition()
        }
    }

    function moveSectionBackward() {
        if (canMoveToPrevSection()) {
            setIsMovingToTrue()
            moveToPrevSection()
        } else if (loopUp) {
            setIsMovingToTrue()
            moveToLastSection()
            resetSubSectionsToLastPosition()
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
            section.activeSubSectionNumber = 1
            section.translateY = 0
            section.translateX = 0
            return section
        })
    }

    function canMoveToNextSection() {
        return $activeSectionNumber < $sections.length
    }

    function canMoveToPrevSection() {
        return $activeSectionNumber > 1
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
	setContext('moveToNextSection', moveToNextSection)

    function moveToPrevSection() {
        $activeSectionNumber -= 1
    }

    function moveToNextSubSection() {
        $sections[$activeSectionNumber - 1].activeSubSectionNumber += 1
    }

    function moveToPrevSubSection() {
        $sections[$activeSectionNumber - 1].activeSubSectionNumber -= 1
    }

    function moveToFirstSection() {
        $activeSectionNumber = 1
    }
	setContext('moveToFirstSection', moveToFirstSection)

    function moveToLastSection() {
        $activeSectionNumber = $sections.length
    }

    function jumpToFirstSubSection() {
        $sections[$activeSectionNumber - 1].activeSubSectionNumber = 1
    }

    function jumpToLastSubSection() {
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
	setContext('setIsMovingToTrue', setIsMovingToTrue)

	function setIsMovingToFalse() {
        if (restrictMovement) {
            setTimeout(() => {
                $isMoving = false
            }, $duration)
        }
    }
	setContext('setIsMovingToFalse', setIsMovingToFalse)
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
        overflow: hidden;
    }

    .scrollephant[data-scrollephant-direction="vertical"] {
        --scrollephant-translate-y: 0;
    }

    .scrollephant[data-scrollephant-direction="horizontal"] {
        --scrollephant-translate-x: 0;
    }
</style>
