<script lang="ts">
    export let isDisabled: boolean
    export let className = ""
    export { className as class }
</script>

<button
    class="scrollephant-button {className}"
    data-scrollephant-disabled={isDisabled}
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
        transition: calc(var(--scrollephant-duration) / 2) ease-out;

        &[data-scrollephant-disabled="true"] {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        & svg {
            width: 1rem;
            color: white;
        }
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-button {
        padding: 1.5rem 1rem 1.5rem 0.25rem;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-button {
        padding: 0.25rem 1.5rem 1rem 1.5rem;
    }
</style>
