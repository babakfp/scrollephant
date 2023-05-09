<script lang="ts">
    import { setContext } from "svelte"
    import { writable } from "svelte/store"

    export let direction: "vertical" | "horizontal" = "vertical"
    export let activeSectionNumber = 1

    const numberOfSections = setContext("numberOfSections", writable(0))

    function isMovingForward(e: WheelEvent) {
        if (e.deltaY > 0) return true
        if (e.deltaY < 0) return false
        throw Error("Invalid. Moving nowhere!")
    }

    function handleMousewheel(e: WheelEvent) {
        if (isMovingForward(e)) {
            if (activeSectionNumber < $numberOfSections) {
                activeSectionNumber += 1
            }
        } else {
            if (activeSectionNumber > 1) {
                activeSectionNumber -= 1
            }
        }

        console.log("$numberOfSections:", $numberOfSections)
        console.log("activeSectionNumber:", activeSectionNumber)
    }
</script>

<div
    class="scrollephant"
    data-direction={direction}
    on:wheel={handleMousewheel}
>
    <slot />
</div>
