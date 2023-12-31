<script lang="ts">
    import { isMoving } from "./stores.js"

    export let isHidden: boolean
    export let className = ""
    export { className as class }
</script>

<button
    class="scrollephant-arrow {className}"
    data-scrollephant-arrow-hidden={isHidden}
    data-scrollephant-arrow-disabled={$isMoving}
    on:click
>
    <slot />
</button>

<style>
    .scrollephant-arrow {
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
        display: flex;
        transition: calc(var(--scrollephant-duration) - 300ms) ease-out;
    }

    .scrollephant-arrow[data-scrollephant-arrow-hidden="true"] {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }

    .scrollephant-arrow[data-scrollephant-arrow-disabled="true"] {
        opacity: 0.5;
        pointer-events: none;
    }

    .scrollephant-arrow :global(svg) {
        width: 1rem;
        color: white;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-arrow {
        padding: 1rem 1rem 1rem 0.25rem;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-arrow {
        padding: 0.25rem 1rem 1rem 1rem;
    }
</style>
