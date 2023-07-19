<script lang="ts">
    import { getContext } from "svelte"
    import type { Readable } from "svelte/store"
    import type { Props } from "./types.js"
    import ScrollephantArrow from "./ScrollephantArrow.svelte"
    import ArrowUp from "./icons/ArrowDown.svelte"
    import ArrowLeft from "./icons/ArrowRight.svelte"

    const direction: Props["direction"] = getContext("direction")
    const loopUp: Props["loopUp"] = getContext("loopUp")
    const moveBackward = getContext<() => void>("moveBackward")
    const canMoveToPrevSection = getContext<Readable<boolean>>(
        "canMoveToPrevSection"
    )
</script>

<ScrollephantArrow
    class="scrollephant-arrow-prev"
    isDisabled={!($canMoveToPrevSection || loopUp)}
    on:click={moveBackward}
>
    {#if direction === "vertical"}
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
