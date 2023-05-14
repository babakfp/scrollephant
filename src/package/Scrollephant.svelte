<script lang="ts">
    import { onMount, setContext } from "svelte"
    import { writable } from "svelte/store"
    import type { Props, Sections } from "./types.js"
    import { swipe, type SwipeEvent } from "./swipe.js"

    export let movement: Props["movement"] = "scroll"
    export let direction: Props["direction"] = "vertical"
    export let loopUp: Props["loopUp"] = false
    export let loopDown: Props["loopDown"] = false
    export let restrictMovement: Props["restrictMovement"] = true

    setContext("direction", direction)
    setContext("loopUp", loopUp)
    setContext("loopDown", loopDown)

    const sections = setContext("sections", writable<Sections>([]))
    const activeSectionNumber = setContext("activeSectionNumber", writable(1))
    const isMoving = setContext("isMoving", writable(false))

    let element: HTMLElement
    let duration: number

    let rtl = false

    onMount(() => {
        if (document.dir === "rtl") {
            rtl = true
        }

        duration = Number(
            getComputedStyle(element)
                .getPropertyValue("--scrollephant-duration")
                .slice(0, -2)
        )
    })

    let translateY = 0
    let translateX = 0

    $: {
        const { y, x } = getYX($activeSectionNumber)
        translateY = y
        translateX = x
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

    function handleSwipe(e: SwipeEvent) {
        if (restrictMovement && $isMoving) {
            return
        }

        if (
            (direction === "vertical" && e.detail.direction === "up") ||
            (direction === "horizontal" && e.detail.direction === "left")
        ) {
            moveForward()
        } else if (
            (direction === "vertical" && e.detail.direction === "down") ||
            (direction === "horizontal" && e.detail.direction === "right")
        ) {
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
        if (canMoveToNext()) {
            if (restrictMovement) {
                moveToNext()
                $isMoving = true
            } else {
                moveToNext()
            }
        } else if (loopDown) {
            if (restrictMovement) {
                jumpToFirst()
                $isMoving = true
            } else {
                jumpToFirst()
            }
        }
    }

    function moveBackward() {
        if (canMoveToPrev()) {
            if (restrictMovement) {
                moveToPrev()
                $isMoving = true
            } else {
                moveToPrev()
            }
        } else if (loopUp) {
            if (restrictMovement) {
                jumpToLast()
                $isMoving = true
            } else {
                jumpToLast()
            }
        }
    }

    function canMoveToNext() {
        return $activeSectionNumber < $sections.length
    }

    function canMoveToPrev() {
        return $activeSectionNumber > 1
    }

    function moveToNext() {
        $activeSectionNumber += 1
    }

    function moveToPrev() {
        $activeSectionNumber -= 1
    }

    function jumpToFirst() {
        $activeSectionNumber = 1
    }

    function jumpToLast() {
        $activeSectionNumber = $sections.length
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
    data-scrollephant-movement={movement}
    data-scrollephant-direction={direction}
    style:--scrollephant-translate-y="-{movement === "scroll"
        ? translateY
        : 0}px"
    style:--scrollephant-translate-x="{!rtl ? "-" : ""}{movement === "scroll"
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

        &[data-scrollephant-direction="vertical"] {
            --scrollephant-translate-y: 0;
        }
        &[data-scrollephant-direction="horizontal"] {
            --scrollephant-translate-x: 0;
        }
    }
</style>
