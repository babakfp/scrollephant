<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Props, Sections } from "./types.js"
    import ScrollephantArrow from "./ScrollephantArrow.svelte"

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
    const direction: Props["direction"] = getContext("direction")
    const loopDown: Props["loopDown"] = getContext("loopDown")
    const isMoving: Writable<boolean> = getContext("isMoving")
    const duration: Writable<number> = getContext("duration")
    const restrictMovement: Writable<Props["restrictMovement"]> = getContext(
        "restrictMovement"
    )

    $: canMoveSectionForward = $activeSectionNumber < $sections.length

    function moveForward() {
        if (canMoveSectionForward) {
            setIsMovingToTrue()
            moveToNextSection()
            setIsMovingToFalse()
        } else if (loopDown) {
            setIsMovingToTrue()
            moveToFirstSection()
            setIsMovingToFalse()
        }
    }

    function moveToNextSection() {
        $activeSectionNumber += 1
    }

    function moveToFirstSection() {
        $activeSectionNumber = 1
    }

    function setIsMovingToTrue() {
        if (restrictMovement && $isMoving) {
            $isMoving = true
        }
    }

    function setIsMovingToFalse() {
        if (restrictMovement && $isMoving) {
            setTimeout(() => {
                $isMoving = false
            }, $duration - 300)
        }
    }
</script>

<ScrollephantArrow
    class="scrollephant-arrow-next"
    isDisabled={!(canMoveSectionForward || loopDown)}
    on:click={moveForward}
>
    {#if direction === "vertical"}
        <!-- prettier-ignore -->
        <svg class="scrollephant-arrow-prev-down" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/></svg>
    {:else}
        <!-- prettier-ignore -->
        <svg class="scrollephant-arrow-prev-right" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/></svg>
    {/if}
</ScrollephantArrow>

<style>
    :global(.scrollephant[data-scrollephant-direction="vertical"]
            .scrollephant-arrow-next) {
        padding-top: 0.5rem;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]
            .scrollephant-arrow-next) {
        padding-left: 0.5rem;
    }
</style>
