<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Props, Sections } from "./types.js"
    import ScrollephantButton from "./ScrollephantButton.svelte"

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
    const direction: Props["direction"] = getContext("direction")
    const loopUp: Props["loopUp"] = getContext("loopUp")

    $: canMoveBackward = $activeSectionNumber > 1

    function moveBackward() {
        if (canMoveBackward) {
            $activeSectionNumber -= 1
        } else if (loopUp) {
            moveToLast()
        }
    }

    function moveToLast() {
        activeSectionNumber.set($sections.length)
    }
</script>

<ScrollephantButton
    class="scrollephant-button-prev"
    isDisabled={!(canMoveBackward || loopUp)}
    on:click={moveBackward}
>
    {#if direction === "vertical"}
        <!-- prettier-ignore -->
        <svg class="scrollephant-button-prev-up" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"/></svg>
    {:else}
        <!-- prettier-ignore -->
        <svg class="scrollephant-button-prev-left" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/></svg>
    {/if}
</ScrollephantButton>

<style>
    :global(
            .scrollephant[data-scrollephant-direction="vertical"]
                .scrollephant-button-prev
        ) {
        padding-bottom: 0.5rem;
    }

    :global(
            .scrollephant[data-scrollephant-direction="horizontal"]
                .scrollephant-button-prev
        ) {
        padding-right: 0.5rem;
    }
</style>
