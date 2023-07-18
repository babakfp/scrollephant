<script lang="ts">
    import { getContext } from "svelte"
    import type { Readable } from "svelte/store"
    import type { Props } from "./types.js"
    import ScrollephantArrow from "./ScrollephantArrow.svelte"
    const direction: Props["direction"] = getContext("direction")
    const loopUp: Props["loopUp"] = getContext("loopUp")
	const moveBackward = getContext<() => void>("moveBackward")
	const canMoveToPrevSection = getContext<Readable<boolean>>("canMoveToPrevSection")
</script>

<ScrollephantArrow
    class="scrollephant-arrow-prev"
    isDisabled={!($canMoveToPrevSection || loopUp)}
    on:click={moveBackward}
>
    {#if direction === "vertical"}
        <!-- prettier-ignore -->
        <svg class="scrollephant-arrow-prev-up" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"/></svg>
    {:else}
        <!-- prettier-ignore -->
        <svg class="scrollephant-arrow-prev-left" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/></svg>
    {/if}
</ScrollephantArrow>

<style>
    :global(.scrollephant[data-scrollephant-direction="vertical"]
            .scrollephant-arrow-prev) {
        padding-bottom: 0.5rem;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]
            .scrollephant-arrow-prev) {
        padding-right: 0.5rem;
    }
</style>
