<script lang="ts">
    import { getContext } from "svelte"
    import type { Readable } from "svelte/store"
    import type { Props } from "./types.js"
    import ScrollephantArrow from "./ScrollephantArrow.svelte"
	import ArrowDown from "./icons/ArrowDown.svelte"
	import ArrowRight from "./icons/ArrowRight.svelte"

    const direction: Props["direction"] = getContext("direction")
    const loopDown: Props["loopDown"] = getContext("loopDown")
	const moveForward = getContext<() => void>("moveForward")
	const canMoveToNextSection = getContext<Readable<boolean>>("canMoveToNextSection")
</script>

<ScrollephantArrow
    class="scrollephant-arrow-next"
    isDisabled={!($canMoveToNextSection || loopDown)}
    on:click={moveForward}
>
    {#if direction === "vertical"}
        <ArrowDown />
    {:else}
        <ArrowRight />
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
