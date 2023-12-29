<script lang="ts">
    import { getContext } from "svelte"
    import type { Readable } from "svelte/store"
    import ScrollephantArrow from "./ScrollephantArrow.svelte"
    import ArrowUp from "./icons/ArrowUp.svelte"
    import ArrowLeft from "./icons/ArrowLeft.svelte"
    import { direction, loopUp } from "./stores.js"

    const moveBackward = getContext<() => void>("moveBackward")
    const canMoveToPrevSection = getContext<Readable<boolean>>(
        "canMoveToPrevSection"
    )
</script>

<ScrollephantArrow
    class="scrollephant-arrow-prev"
    isDisabled={!($canMoveToPrevSection || $loopUp)}
    on:click={moveBackward}
>
    {#if $direction === "vertical"}
        <ArrowUp />
    {:else}
        <ArrowLeft />
    {/if}
</ScrollephantArrow>

<style>
    :global(
            .scrollephant[data-scrollephant-direction="vertical"]
                .scrollephant-arrow-prev
        ) {
        padding-bottom: 0.5rem;
    }

    :global(
            .scrollephant[data-scrollephant-direction="horizontal"]
                .scrollephant-arrow-prev
        ) {
        padding-right: 0.5rem;
    }
</style>
