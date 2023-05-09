<script lang="ts">
    import { setContext } from "svelte"
    import { writable } from "svelte/store"

    export let direction: "vertical" | "horizontal" = "vertical"
    export let activeSectionNumber = 1

    let windowInnerHeight: number
    let windowInnerWidth: number

    const numberOfSections = setContext("numberOfSections", writable(0))

    function handleMousewheel(e: WheelEvent) {
        if (isMovingForward(e)) {
            if (canMoveForward()) {
                activeSectionNumber += 1
            }
        } else {
            if (canMoveBackward()) {
                activeSectionNumber -= 1
            }
        }

        console.log("$numberOfSections:", $numberOfSections)
        console.log("activeSectionNumber:", activeSectionNumber)
    }

    function canMoveForward() {
        if (activeSectionNumber < $numberOfSections) {
            return true
        }
        return false
    }

    function canMoveBackward() {
        if (activeSectionNumber > 1) {
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
    style:--scrollephant-translate-y="-{(activeSectionNumber - 1) *
        windowInnerHeight}px"
    style:--scrollephant-translate-x="{(activeSectionNumber - 1) *
        windowInnerWidth}px"
    on:wheel|preventDefault={handleMousewheel}
>
    <slot />
</div>

<style>
    .scrollephant {
        --scrollephant-duration: 800ms;
        --scrollephant-timing-function: ease-out;
    }
    .scrollephant[data-direction="vertical"] {
        --scrollephant-translate-y: 0;
    }
    .scrollephant[data-direction="horizontal"] {
        --scrollephant-translate-x: 0;
    }
</style>
