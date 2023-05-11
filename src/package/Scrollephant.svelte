<script lang="ts">
    import { setContext } from "svelte"
    import { writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import { swipe, type SwipeEvent } from "./swipe.js"

    export let direction: "vertical" | "horizontal" = "vertical"
    export let loopFromStart = false
    export let loopFromEnd = false

    const sections = setContext("sections", writable<Sections>([]))
    const activeSectionNumber = setContext("activeSectionNumber", writable(1))

    let translateY = 0
    let translateX = 0

    $: {
        if (direction === "vertical") {
            translateY = 0
        } else if (direction === "horizontal") {
            translateX = 0
        }

        for (let i = 0; i < $activeSectionNumber - 1; i++) {
            if (direction === "vertical") {
                translateY +=
                    $sections[$activeSectionNumber - (i + 2)]?.ref.clientHeight
            } else if (direction === "horizontal") {
                translateX +=
                    $sections[$activeSectionNumber - (i + 2)]?.ref.clientWidth
            }
        }
    }

    function handleSwipe(e: SwipeEvent) {
        if (direction === "vertical") {
            if (e.detail.direction === "up") {
                moveForward()
            }
            if (e.detail.direction === "down") {
                moveBackward()
            }
        }

        if (direction === "horizontal") {
            if (e.detail.direction === "left") {
                moveForward()
            }
            if (e.detail.direction === "right") {
                moveBackward()
            }
        }
    }

    function handleMousewheel(e: WheelEvent) {
        if (isMovingForward(e)) {
            moveForward()
        } else if (isMovingBackward(e)) {
            moveBackward()
        }
    }

    function moveForward() {
        if (canMoveForward()) {
            $activeSectionNumber += 1
        } else if (loopFromEnd) {
            $activeSectionNumber = 1
        }
    }

    function moveBackward() {
        if (canMoveBackward()) {
            $activeSectionNumber -= 1
        } else if (loopFromStart) {
            $activeSectionNumber = $sections.length
        }
    }

    function canMoveForward() {
        if ($activeSectionNumber < $sections.length) {
            return true
        }
        return false
    }

    function canMoveBackward() {
        if ($activeSectionNumber > 1) {
            return true
        }
        return false
    }

    function isMovingForward(e: WheelEvent) {
        return e.deltaY > 0
    }

    function isMovingBackward(e: WheelEvent) {
        return e.deltaY < 0
    }
</script>

<div
    class="scrollephant"
    data-direction={direction}
    style:--scrollephant-translate-y="-{translateY}px"
    style:--scrollephant-translate-x="-{translateX}px"
    on:wheel|preventDefault={handleMousewheel}
    use:swipe
    on:swipe={handleSwipe}
>
    <slot />
</div>

<style>
    .scrollephant {
        --scrollephant-duration: 700ms;
        --scrollephant-timing-function: ease-out;
        overflow: hidden;

        &[data-direction="vertical"] {
            --scrollephant-translate-y: 0;
        }
        &[data-direction="horizontal"] {
            --scrollephant-translate-x: 0;
        }
    }
</style>
