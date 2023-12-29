<script lang="ts">
    import ScrollephantArrow from "./ScrollephantArrow.svelte"
    import ArrowUp from "./icons/ArrowUp.svelte"
    import ArrowLeft from "./icons/ArrowLeft.svelte"
    import { direction, loopUp, canMoveToPrevSection } from "./stores.js"
    import { moveBackward } from "./utils.js"
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
