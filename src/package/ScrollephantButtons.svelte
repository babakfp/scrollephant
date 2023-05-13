<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import { moveForward, moveBackward } from "./utils.js"

    const direction: "vertical" | "horizontal" = getContext("direction")
    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
    const loopFromStart: boolean = getContext("loopFromStart")
    const loopFromEnd: boolean = getContext("loopFromEnd")

    $: canMoveForward = $activeSectionNumber < $sections.length
    $: canMoveBackward = $activeSectionNumber > 1
</script>

<nav class="scrollephant-buttons">
    <button
        class="scrollephant-buttons-prev"
        data-scrollephant-disabled={!(canMoveBackward || loopFromStart)}
        on:click={() =>
            moveBackward(
                canMoveBackward,
                activeSectionNumber,
                sections,
                loopFromStart
            )}
    >
        {#if direction === "vertical"}
            <!-- prettier-ignore -->
            <svg class="scrollephant-buttons-prev-up" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"/></svg>
        {:else}
            <!-- prettier-ignore -->
            <svg class="scrollephant-buttons-prev-left" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/></svg>
        {/if}
    </button>
    <button
        class="scrollephant-buttons-next"
        data-scrollephant-disabled={!(canMoveForward || loopFromEnd)}
        on:click={() =>
            moveForward(canMoveForward, activeSectionNumber, loopFromEnd)}
    >
        {#if direction === "vertical"}
            <!-- prettier-ignore -->
            <svg class="scrollephant-buttons-prev-down" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/></svg>
        {:else}
            <!-- prettier-ignore -->
            <svg class="scrollephant-buttons-prev-right" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/></svg>
        {/if}
    </button>
</nav>

<style>
    .scrollephant-buttons {
        position: fixed;

        & button {
            border: none;
            background: transparent;
            padding: 0;
            cursor: pointer;
            transition: calc(var(--scrollephant-duration) / 2) ease-out;

            &[data-scrollephant-disabled="true"] {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }
        }

        & svg {
            width: 1rem;
            color: white;
        }
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-buttons {
        right: 0;
        top: 0;
        bottom: 0;
        display: grid;
        align-content: space-between;

        & button {
            padding: 1.5rem 1rem 1.5rem 0.25rem;

            &.scrollephant-buttons-prev {
                padding-bottom: 0.5rem;
            }
            &.scrollephant-buttons-next {
                padding-top: 0.5rem;
            }
        }
    }
    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-buttons {
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;

        & button {
            padding: 0.25rem 1.5rem 1rem 1.5rem;

            &.scrollephant-buttons-prev {
                padding-right: 0.5rem;
            }
            &.scrollephant-buttons-next {
                padding-left: 0.5rem;
            }
        }
    }
</style>
