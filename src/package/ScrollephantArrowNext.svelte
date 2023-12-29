<script lang="ts">
    import ScrollephantArrow from "./ScrollephantArrow.svelte"
    import ArrowDown from "./icons/ArrowDown.svelte"
    import ArrowRight from "./icons/ArrowRight.svelte"
    import { direction, loopDown, canMoveToNextSection } from "./stores.js"
    import { moveForward } from "./utils.js"
</script>

<ScrollephantArrow
    class="scrollephant-arrow-next"
    isDisabled={!($canMoveToNextSection || $loopDown)}
    on:click={moveForward}
>
    {#if $direction === "vertical"}
        <ArrowDown />
    {:else}
        <ArrowRight />
    {/if}
</ScrollephantArrow>

<style>
    :global(
            .scrollephant[data-scrollephant-direction="vertical"]
                .scrollephant-arrow-next
        ) {
        padding-top: 0.5rem;
    }

    :global(
            .scrollephant[data-scrollephant-direction="horizontal"]
                .scrollephant-arrow-next
        ) {
        padding-left: 0.5rem;
    }
</style>
