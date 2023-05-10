<script lang="ts">
    import { setContext } from "svelte"
    import { writable } from "svelte/store"
    import { swipe, type SwipeEvent } from "./swipe.js"

    export let direction: "vertical" | "horizontal" = "vertical"
    export let loopFromStart = false
    export let loopFromEnd = false

    let windowInnerHeight: number
    let windowInnerWidth: number

    const numberOfSections = setContext("numberOfSections", writable(0))
    const activeSectionNumber = setContext("activeSectionNumber", writable(1))

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
        move(e)

        console.log("$numberOfSections:", $numberOfSections)
        console.log("$activeSectionNumber:", $activeSectionNumber)
    }

    function move(e: WheelEvent) {
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
            $activeSectionNumber = $numberOfSections
        }
    }

    function canMoveForward() {
        if ($activeSectionNumber < $numberOfSections) {
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

<svelte:window
    bind:innerHeight={windowInnerHeight}
    bind:innerWidth={windowInnerWidth}
/>

<div
    class="scrollephant"
    data-direction={direction}
    style:--scrollephant-translate-y={direction === "vertical"
        ? `-${($activeSectionNumber - 1) * windowInnerHeight}px`
        : 0}
    style:--scrollephant-translate-x={direction === "horizontal"
        ? `-${($activeSectionNumber - 1) * windowInnerWidth}px`
        : 0}
    on:wheel|preventDefault={handleMousewheel}
    use:swipe
    on:swipe={handleSwipe}
>
    <slot />
</div>

<style>
    .scrollephant {
        --scrollephant-duration: 800ms;
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
