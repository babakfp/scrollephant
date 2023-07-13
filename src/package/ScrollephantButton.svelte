<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"

    export let isDisabled: boolean
    export let className = ""
    export { className as class }

    const isMoving: Writable<boolean> = getContext("isMoving")
</script>

<button
    class="scrollephant-button {className}"
    data-scrollephant-hidden={isDisabled}
    data-scrollephant-disabled={$isMoving}
    on:click
>
    <slot />
</button>

<style>
    .scrollephant-button {
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
        display: flex;
        transition: calc(var(--scrollephant-duration) - 300ms) ease-out;
    }

    .scrollephant-button[data-scrollephant-hidden="true"] {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }

    .scrollephant-button[data-scrollephant-disabled="true"] {
        opacity: 0.5;
        pointer-events: none;
    }

    .scrollephant-button :global(svg) {
        width: 1rem;
        color: white;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-button {
        padding: 1rem 1rem 1rem 0.25rem;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-button {
        padding: 0.25rem 1rem 1rem 1rem;
    }
</style>
