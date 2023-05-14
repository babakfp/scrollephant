<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Props, Sections } from "./types.js"
    import { moveForward } from "./utils.js"
    import ScrollephantButton from "./ScrollephantButton.svelte"

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
    const direction: Props["direction"] = getContext("direction")
    const loopDown: Props["loopDown"] = getContext("loopDown")

    $: canMoveForward = $activeSectionNumber < $sections.length
</script>

<ScrollephantButton
    class="scrollephant-button-next"
    isDisabled={!(canMoveForward || loopDown)}
    on:click={() => moveForward(canMoveForward, activeSectionNumber, loopDown)}
>
    {#if direction === "vertical"}
        <!-- prettier-ignore -->
        <svg class="scrollephant-button-prev-down" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/></svg>
    {:else}
        <!-- prettier-ignore -->
        <svg class="scrollephant-button-prev-right" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/></svg>
    {/if}
</ScrollephantButton>

<style>
    :global(
            .scrollephant[data-scrollephant-direction="vertical"]
                .scrollephant-button-next
        ) {
        padding-top: 0.5rem;
    }

    :global(
            .scrollephant[data-scrollephant-direction="horizontal"]
                .scrollephant-button-next
        ) {
        padding-left: 0.5rem;
    }
</style>
