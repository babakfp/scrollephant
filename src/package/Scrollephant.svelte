<script lang="ts">
    import { setContext } from "svelte"
    import { writable } from "svelte/store"

    export let direction: "vertical" | "horizontal" = "vertical"
    export let loopFromTop = false
    export let loopFromBottom = false

    let windowInnerHeight: number
    let windowInnerWidth: number

    const numberOfSections = setContext("numberOfSections", writable(0))
    const activeSectionNumber = setContext("activeSectionNumber", writable(1))

    function handleMousewheel(e: WheelEvent) {
        move(e)

        console.log("$numberOfSections:", $numberOfSections)
        console.log("$activeSectionNumber:", $activeSectionNumber)
    }

    function move(e: WheelEvent) {
        if (isMovingForward(e)) {
            if (canMoveForward()) {
                $activeSectionNumber += 1
            } else if (loopFromBottom) {
                $activeSectionNumber = 1
            }
        } else {
            if (canMoveBackward()) {
                $activeSectionNumber -= 1
            } else if (loopFromTop) {
                $activeSectionNumber = $numberOfSections
            }
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
        if (e.deltaY > 0) return true
        if (e.deltaY < 0) return false
        throw Error("Invalid. Moving nowhere!")
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
>
    <slot />
</div>

<style>
    .scrollephant {
        --scrollephant-duration: 800ms;
        --scrollephant-timing-function: ease-out;

        &[data-direction="vertical"] {
            --scrollephant-translate-y: 0;
        }
        &[data-direction="horizontal"] {
            --scrollephant-translate-x: 0;
        }
    }
</style>
